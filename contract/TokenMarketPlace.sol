// SPDX-License-Identifier: MIT
pragma solidity >=0.4.24;

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract TokenMarketPlace {
    using SafeERC20 for IERC20;
    using SafeMath for uint;
    uint public priceOfToken = 2e16 wei;
    uint public sellerCount = 1;
    uint public buyerCount;

    IERC20 public gldToken;

    event TokenPriceUpdated(uint newPrice);
    event TokenBought(address indexed buyer, uint amount, uint tokenPrice);
    event TokenSold(address indexed sellet, uint amount, uint tokenPrice);

    constructor(address _erc20Token) {
        gldToken = IERC20(_erc20Token);
    }

    function calculateTokenPrice() public {
        // Using the Safe Math Library
        require(buyerCount != 0, "There must be atleast 1 buyer");
        uint totalParticipants = sellerCount.add(buyerCount);
        //priceOfToken = priceOfToken.mul(buyerCount.div(totalParticipants));
        priceOfToken = (priceOfToken.mul(buyerCount)).div(totalParticipants);
        emit TokenPriceUpdated(priceOfToken);
    }

    function buyGLDToken(uint _amountOfToken) public payable {
        uint priceToPay = priceOfToken.mul(_amountOfToken.div(1e18));
        //uint priceToPay = priceOfToken * (_amountOfToken/1e18);
        require(msg.value == priceToPay, "Ether not enough");
        gldToken.transfer(msg.sender, _amountOfToken);
        buyerCount = buyerCount.add(1);
        emit TokenBought(msg.sender, _amountOfToken, priceOfToken);
    }

    function sellGLDToken(uint _amountOfToken) public payable {
        require(
            gldToken.balanceOf(msg.sender) == _amountOfToken,
            "Not enough Token Balance"
        );
        uint priceToPayToTheUser = priceOfToken.mul(_amountOfToken.div(1e18));
        // uint priceToPayToTheUser = priceOfToken * (_amountOfToken/1e18);
        gldToken.safeTransferFrom(msg.sender, address(this), _amountOfToken);
        (bool sucess, ) = msg.sender.call{value: priceToPayToTheUser}("");
        require(sucess, "Transaction failed");
        sellerCount = sellerCount.add(1);
        emit TokenSold(msg.sender, _amountOfToken, priceOfToken);
    }

    receive() external payable {}

    fallback() external payable {}
}
