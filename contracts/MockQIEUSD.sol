// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title MockQIEUSD - Demo stablecoin for QIE Reputation Pay hackathon MVP
contract MockQIEUSD is ERC20 {
    constructor() ERC20("Mock QIE USD", "QIEUSD") {
        _mint(msg.sender, 1_000_000 * 10 ** decimals());
    }

    /// @notice Mint tokens for demo/testing (public faucet for hackathon)
    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
