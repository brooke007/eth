// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Counter {
    uint256 public counter;

    // Function to retrieve the counter value
    function get() public view returns (uint256) {
        return counter;
    }

    // Function to increment the counter by a given value
    function add(uint256 x) public {
        counter += x;
    }
}
