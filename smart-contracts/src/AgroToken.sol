// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {ERC20} from '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import {Ownable} from '@openzeppelin/contracts/access/Ownable.sol';

/// @title Agro Token
/// @author Andrei Iarovoi
/// @notice ERC20 token used for staking in the AgroStake protocol
contract AgroToken is ERC20, Ownable {
  /// @notice Amount of AGRO distributed by the faucet
  uint256 public constant FAUCET_AMOUNT = 1_000 ether;

  /// @notice Cooldown period between faucet claims
  uint256 public constant FAUCET_COOLDOWN = 1 days;

  /// @notice Timestamp of the user's last faucet claim
  mapping(address => uint256) public lastFaucetClaim;

  /// @notice Thrown when faucet cooldown has not expired
  error FaucetCooldownActive();

  /// @notice Emitted when a user claims faucet tokens
  /// @param user Address claiming tokens
  /// @param amount Amount of tokens received
  event FaucetClaimed(address indexed user, uint256 amount);

  /// @param initialOwner Owner of the contract
  constructor(address initialOwner) ERC20('Agro Token', 'AGRO') Ownable(initialOwner) {}

  /// @notice Mint AGRO tokens
  /// @dev Only contract owner can mint
  /// @param to Recipient address
  /// @param amount Amount of tokens to mint
  function mint(address to, uint256 amount) external onlyOwner {
    _mint(to, amount);
  }

  /// @notice Claim free AGRO test tokens
  /// @dev Can only be called once per cooldown period
  function faucet() external {
    if (
      lastFaucetClaim[msg.sender] != 0 &&
      block.timestamp < lastFaucetClaim[msg.sender] + FAUCET_COOLDOWN
    ) {
      revert FaucetCooldownActive();
    }

    lastFaucetClaim[msg.sender] = block.timestamp;

    _mint(msg.sender, FAUCET_AMOUNT);

    emit FaucetClaimed(msg.sender, FAUCET_AMOUNT);
  }
}
