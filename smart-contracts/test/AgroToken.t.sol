// SPDX-License-Identifier: MIT
pragma solidity ^0.8.30;

import {Test} from "forge-std/Test.sol";
import {AgroToken} from "../src/AgroToken.sol";

contract AgroTokenTest is Test {
    AgroToken token;

    address owner = address(this);
    address user = makeAddr("user");

    function setUp() public {
        token = new AgroToken(owner);
    }

    function test_ConstructorSetsCorrectValues() public view{
        assertEq(token.name(), "Agro Token");
        assertEq(token.symbol(), "AGRO");
        assertEq(token.owner(), owner);
    }

    function test_OwnerCanMint() public {
        token.mint(user, 100 ether);

        assertEq(token.balanceOf(user), 100 ether);
    }

    function test_NonOwnerCannotMint() public {
        vm.prank(user);

        vm.expectRevert();

        token.mint(user, 100 ether);
    }

    function test_FaucetClaim() public {
        vm.prank(user);

        token.faucet();

        assertEq(
            token.balanceOf(user),
            token.FAUCET_AMOUNT()
        );
    }

    function test_FaucetCooldownReverts() public {
        vm.startPrank(user);

        token.faucet();

        vm.expectRevert(
            AgroToken.FaucetCooldownActive.selector
        );

        token.faucet();

        vm.stopPrank();
    }

    function test_FaucetAfterCooldown() public {
        vm.startPrank(user);

        token.faucet();

        vm.warp(
            block.timestamp +
            token.FAUCET_COOLDOWN()
        );

        token.faucet();

        assertEq(
            token.balanceOf(user),
            token.FAUCET_AMOUNT() * 2
        );

        vm.stopPrank();
    }
}