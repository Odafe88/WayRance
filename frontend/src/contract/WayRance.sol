// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract WayRance is Ownable {
    IERC20 public paymentToken;

    constructor(address _paymentToken) {
        wasteAdmin = payable(msg.sender);
        paymentToken = IERC20(_paymentToken);
    }

    struct Waste {
        address payable disposer;
        string wasteType;
        string collectionLocation;
        uint256 weight;
        bool isRecorded;
        bool isValidated;
        bool isPaid;
        uint256 wasteAmount;
    }

    struct Disposer {
        string name;
        uint256 userId;
        string location;
        string email;
        address payable walletAddress;
    }

    mapping(uint256 => Waste) public wasteRecords;
    mapping(uint256 => Disposer) public disposers;

    address payable public wasteAdmin;
    uint256 public disposerCounter;
    uint256 public wasteCounter;

    event WasteRecorded(uint256 indexed wasteId, address disposer, string wasteType, string collectionLocation, uint256 weight, uint256 wasteAmount);
    event WasteValidated(uint256 indexed wasteId, address indexed wasteAdmin);
    event PaymentSent(address indexed recipient, uint256 amount);
    event FundsWithdrawn(address indexed wasteAdmin, uint256 amount);
    event DisposerRegistered(uint256 indexed disposerId, string name, string location, address walletAddress);

    modifier onlyWasteAdmin() {
        require(msg.sender == wasteAdmin, "Only the waste admin can perform this action");
        _;
    }

    function getAdminAddress() external view returns (address) {
        return wasteAdmin;
    }

    function registerDisposer(string memory _name, string memory _location, string memory _email, address payable _walletAddress) public {
        require(_walletAddress != address(0), "Invalid wallet address");
        uint256 disposerIndex = disposerCounter++;
        disposers[disposerIndex] = Disposer(_name, disposerIndex, _location, _email, _walletAddress);
        emit DisposerRegistered(disposerIndex, _name, _location, _walletAddress);
    }

    function recordWaste(address payable _disposer, string memory _wasteType, string memory _collectionLocation, uint256 _weight, uint256 _wasteAmount) public {
        wasteRecords[wasteCounter++] = Waste(_disposer, _wasteType, _collectionLocation, _weight, true, false, false, _wasteAmount);
        emit WasteRecorded(wasteCounter, _disposer, _wasteType, _collectionLocation, _weight, _wasteAmount);
    }
    
    function validateWaste(uint256 _wasteId) public onlyWasteAdmin {
        require(_wasteId < wasteCounter, "Invalid waste ID");
        require(wasteRecords[_wasteId].isRecorded, "Waste is not yet recorded");
        require(!wasteRecords[_wasteId].isValidated, "Waste is already validated");
        wasteRecords[_wasteId].isValidated = true;
        emit WasteValidated(_wasteId, msg.sender);
    }

    function wastePayment(address _disposer, uint256 _wasteId, uint256 amount) external onlyWasteAdmin {
        require(!wasteRecords[_wasteId].isPaid, "Waste is already paid for");
        require(paymentToken.transferFrom(msg.sender, _disposer, amount), "Transfer failed");
        wasteRecords[_wasteId].isPaid = true;
        emit PaymentSent(_disposer, amount);
    }

    function withdrawFunds(uint256 _amount) public onlyWasteAdmin {
        require(paymentToken.transfer(wasteAdmin, _amount), "Withdrawal failed");
        emit FundsWithdrawn(wasteAdmin, _amount);
    }

    function retriveDisposers() public view returns (Disposer[] memory) {
        Disposer[] memory _disposers = new Disposer[](disposerCounter);
        for (uint256 i = 0; i < disposerCounter; i++) {
            _disposers[i] = disposers[i];
        }
        return _disposers;
    }

    receive() external payable {}
}
