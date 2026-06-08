// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Test} from 'forge-std/Test.sol';

import {AgroToken} from '../src/AgroToken.sol';
import {AgroStaking} from '../src/AgroStaking.sol';

contract AgroStakingTest is Test {
  AgroToken token;
  AgroStaking staking;

  address owner = address(this);
  address user = makeAddr('user');

  function setUp() public {
    token = new AgroToken(owner);

    staking = new AgroStaking(address(token), owner);

    token.mint(user, 10_000 ether);
  }

  function test_PendingRewardsAfter30Days() public {
    vm.startPrank(user);

    token.approve(address(staking), 1_000 ether);

    staking.stake(1_000 ether);

    vm.warp(block.timestamp + 30 days);

    uint256 rewards = staking.pendingRewards(user);

    vm.stopPrank();

    uint256 expectedRewards =
      (1000 ether * staking.APR() * 30 days) / (staking.BASIS_POINTS() * staking.YEAR_IN_SECONDS());

    emit log_named_uint('Rewards after 30 days', rewards);

    assertApproxEqAbs(rewards, expectedRewards, 1);
  }

  function test_OwnerCanFundRewardPool() public {
    uint256 amount = 100_000 ether;

    token.mint(owner, amount);

    token.approve(address(staking), amount);

    staking.fundRewardPool(amount);

    assertEq(token.balanceOf(address(staking)), amount);
  }

  function test_UserCanClaimRewards() public {
    uint256 stakeAmount = 1000 ether;
    uint256 rewardPool = 100000 ether;

    token.mint(owner, rewardPool);

    token.approve(address(staking), rewardPool);

    staking.fundRewardPool(rewardPool);

    vm.startPrank(user);

    token.approve(address(staking), stakeAmount);

    staking.stake(stakeAmount);

    vm.warp(block.timestamp + 30 days);

    uint256 balanceBefore = token.balanceOf(user);

    staking.claimRewards();

    uint256 balanceAfter = token.balanceOf(user);

    vm.stopPrank();

    assertGt(balanceAfter, balanceBefore);
  }

  function test_ClaimWithoutRewardsReverts() public {
    vm.prank(user);

    vm.expectRevert(AgroStaking.NoRewardsAvailable.selector);

    staking.claimRewards();
  }

  function _stakeAsUser(uint256 amount) internal {
    vm.startPrank(user);

    token.approve(address(staking), amount);

    staking.stake(amount);

    vm.stopPrank();
  }

  function test_PartialUnstake() public {
    uint256 amount = 1000 ether;

    _stakeAsUser(amount);

    vm.warp(block.timestamp + 8 days);

    vm.prank(user);

    staking.unstake(500 ether);

    AgroStaking.StakeInfo memory info = staking.getStakeInfo(user);

    assertEq(info.amount, 500 ether);

    assertEq(staking.totalStaked(), 500 ether);
  }

  function test_FullUnstakeRemovesStaker() public {
    _stakeAsUser(1000 ether);

    vm.warp(block.timestamp + 8 days);

    vm.prank(user);

    staking.unstake(1000 ether);

    AgroStaking.StakeInfo memory info = staking.getStakeInfo(user);

    assertEq(info.amount, 0);

    assertEq(staking.totalStakers(), 0);
  }

  function test_UnstakeBeforeLockPeriodReverts() public {
    _stakeAsUser(1000 ether);

    vm.warp(block.timestamp + 2 days);

    vm.startPrank(user);

    vm.expectRevert(AgroStaking.LockPeriodNotExpired.selector);

    staking.unstake(100 ether);

    vm.stopPrank();
  }

  function test_UnstakeMoreThanStakedReverts() public {
    _stakeAsUser(1000 ether);

    vm.warp(block.timestamp + 8 days);

    vm.startPrank(user);

    vm.expectRevert(AgroStaking.InsufficientStake.selector);

    staking.unstake(2000 ether);

    vm.stopPrank();
  }

  function test_UnstakePreservesRewards() public {
    _stakeAsUser(1000 ether);

    vm.warp(block.timestamp + 30 days);

    vm.prank(user);

    staking.unstake(500 ether);

    uint256 rewards = staking.pendingRewards(user);

    assertGt(rewards, 0);
  }

  function test_EmergencyWithdraw() public {
    uint256 stakeAmount = 1000 ether;

    _stakeAsUser(stakeAmount);

    uint256 balanceBefore = token.balanceOf(user);

    vm.prank(user);

    staking.emergencyWithdraw();

    uint256 balanceAfter = token.balanceOf(user);

    AgroStaking.StakeInfo memory info = staking.getStakeInfo(user);

    assertEq(info.amount, 0);

    assertEq(balanceAfter, balanceBefore + stakeAmount);

    assertEq(staking.totalStaked(), 0);
  }

  function test_EmergencyWithdrawIgnoresLockPeriod() public {
    _stakeAsUser(1000 ether);

    vm.warp(block.timestamp + 1 days);

    vm.prank(user);

    staking.emergencyWithdraw();

    AgroStaking.StakeInfo memory info = staking.getStakeInfo(user);

    assertEq(info.amount, 0);
  }

  function test_EmergencyWithdrawBurnsRewards() public {
    _stakeAsUser(1000 ether);

    vm.warp(block.timestamp + 30 days);

    vm.prank(user);

    staking.emergencyWithdraw();

    uint256 rewards = staking.pendingRewards(user);

    assertEq(rewards, 0);
  }

  function test_EmergencyWithdrawWithoutStakeReverts() public {
    vm.prank(user);

    vm.expectRevert(AgroStaking.NoActiveStake.selector);

    staking.emergencyWithdraw();
  }

  function test_EmergencyWithdrawRemovesStaker() public {
    _stakeAsUser(1000 ether);

    vm.prank(user);

    staking.emergencyWithdraw();

    assertEq(staking.totalStakers(), 0);
  }

  function test_NonOwnerCannotPause() public {
    vm.prank(user);

    vm.expectRevert();

    staking.pause();
  }

  function test_OwnerCanPause() public {
    staking.pause();

    assertTrue(staking.paused());
  }

  function test_StakeRevertsWhenPaused() public {
    staking.pause();

    vm.startPrank(user);

    token.approve(address(staking), 1000 ether);

    vm.expectRevert();

    staking.stake(1000 ether);

    vm.stopPrank();
  }

  function test_UnpauseRestoresFunctionality() public {
    staking.pause();

    staking.unpause();

    _stakeAsUser(1000 ether);

    assertEq(staking.totalStaked(), 1000 ether);
  }

  function test_GetProtocolStats() public {
    uint256 rewardPool = 100_000 ether;

    token.mint(owner, rewardPool);

    token.approve(address(staking), rewardPool);

    staking.fundRewardPool(rewardPool);

    _stakeAsUser(1000 ether);

    AgroStaking.ProtocolStats memory stats = staking.getProtocolStats();

    assertEq(stats.totalStaked, 1000 ether);

    assertEq(stats.totalStakers, 1);

    assertEq(stats.apr, staking.APR());

    assertEq(stats.lockPeriod, staking.LOCK_PERIOD());
  }
}
