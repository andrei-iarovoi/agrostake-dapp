// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {IERC20} from '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';
import {Pausable} from '@openzeppelin/contracts/utils/Pausable.sol';
import {ReentrancyGuard} from '@openzeppelin/contracts/utils/ReentrancyGuard.sol';

/// @title AgroStake
/// @author Andrei Iarovoi
/// @notice Staking contract for AGRO token
contract AgroStaking is Ownable, Pausable, ReentrancyGuard {
  /// @notice Annual percentage rate
  uint256 public constant APR = 12;

  /// @notice Percentage denominator
  uint256 public constant BASIS_POINTS = 100;

  /// @notice Seconds in one year
  uint256 public constant YEAR_IN_SECONDS = 365 days;

  /// @notice Minimum staking lock period
  uint256 public constant LOCK_PERIOD = 7 days;

  /// @notice AGRO token contract
  IERC20 public immutable stakingToken;

  struct StakeInfo {
    uint256 amount;
    uint256 rewardsClaimed;
    uint256 unclaimedRewards;
    uint256 lastRewardTimestamp;
    uint256 stakeTimestamp;
  }

  mapping(address => StakeInfo) public stakes;

  uint256 public totalStaked;
  uint256 public totalStakers;

  error AmountMustBeGreaterThanZero();
  error InsufficientStake();
  error LockPeriodNotExpired();
  error NoRewardsAvailable();

  event Staked(address indexed user, uint256 amount);
  event Unstaked(address indexed user, uint256 amount);
  event RewardsClaimed(address indexed user, uint256 reward);
  event EmergencyWithdraw(address indexed user, uint256 amount);

  /// @param tokenAddress AGRO token address
  constructor(address tokenAddress, address initialOwner) Ownable(initialOwner) {
    stakingToken = IERC20(tokenAddress);
  }

  /// @notice Stake AGRO tokens into the protocol
  /// @param amount Amount of tokens to stake
  function stake(uint256 amount) external whenNotPaused nonReentrant {
    if (amount == 0) {
      revert AmountMustBeGreaterThanZero();
    }

    StakeInfo storage userStake = stakes[msg.sender];

    _updateRewards(msg.sender);

    bool isNewStaker = userStake.amount == 0;

    stakingToken.transferFrom(msg.sender, address(this), amount);

    userStake.amount += amount;

    if (isNewStaker) {
      totalStakers++;
      userStake.stakeTimestamp = block.timestamp;
    }

    userStake.lastRewardTimestamp = block.timestamp;

    totalStaked += amount;

    emit Staked(msg.sender, amount);
  }

  /// @notice Updates user's accumulated rewards
  /// @param user Address of the staker
  function _updateRewards(address user) private {
    user;
  }
}
