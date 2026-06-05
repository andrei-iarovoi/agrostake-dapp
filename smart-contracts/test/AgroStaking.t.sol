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
}
