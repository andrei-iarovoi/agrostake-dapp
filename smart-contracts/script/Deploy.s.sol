// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Script, console2} from 'forge-std/Script.sol';

import {AgroToken} from '../src/AgroToken.sol';
import {AgroStaking} from '../src/AgroStaking.sol';

contract Deploy is Script {
  function run() external {
    uint256 deployerPrivateKey = vm.envUint('PRIVATE_KEY');

    vm.startBroadcast(deployerPrivateKey);

    AgroToken token = new AgroToken(msg.sender);

    AgroStaking staking = new AgroStaking(address(token), msg.sender);

    vm.stopBroadcast();

    console2.log('AgroToken:', address(token));

    console2.log('AgroStaking:', address(staking));
  }
}
