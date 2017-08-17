pragma solidity ^0.4.11;

/**
*  This is the standard interface for a Product (beta).
*/
contract Product {
    function name(uint256 DIN) constant returns (string) {}
    function retailURL(uint256 DIN) constant returns (string) {}
    function imageURL(uint256 DIN) constant returns (string) {}
    function category(uint256 DIN) constant returns (string) {}
    function brand(uint256 DIN) constant returns (string) {}
    function manufacturer(uint256 DIN) constant returns (string) {}
    function color(uint256 DIN) constant returns (string) {}
    function model(uint256 DIN) constant returns (string) {}
    function UPC(uint256 DIN) constant returns (uint) {}
    function EAN(uint256 DIN) constant returns (uint) {}
    function description(uint256 DIN) constant returns (string) {}
    function price(uint256 DIN) constant returns (string) {}
}
