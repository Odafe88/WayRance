// SPDX-License-Identifier: MIT
pragma solidity ^0.8.16;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IToroTokenERC20 {
    /// @notice Get token name
    function name() external view returns (string memory);

    /// @notice Get token symbol
    function symbol() external view returns (string memory);

    /// @notice Get token balance
    /// @param addr account address
    function balanceOf(address addr) external view returns (uint256);

    /// @notice Get allowance
    /// @param owner holder address
    /// @param spender spender address
    function allowance(address owner, address spender)
        external
        view
        returns (uint256);

    /// @notice Client toro transfer
    /// @param to Receiver address
    /// @param value Transfer amount
    /// @dev note function return true if the transaction succeed
    function transfer(address to, uint256 value) external returns (bool);

    /// @notice Client toro approve allowance
    /// @param spender Spender address
    /// @param amount Allowance amount
    /// @dev note function return true if the transaction succeed
    function approve(address spender, uint256 amount) external returns (bool);

    /// @notice Toro transferFrom function
    /// @param sender Sender address
    /// @param recipient Recipient address
    /// @param amount Transfer amount
    /// @dev note function return true if the transaction succeed
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    /// @notice Calculate transfer fee
    /// @param sender Sender address
    /// @param val Transfer amount
    /// @dev Client can use this function before the transaction to get the potential transaction feehoe
    function calculateTxFee(address sender, uint256 val)
        external
        returns (uint256);
}

contract WayRance is Ownable {

    // Constructor to set the waste admin during deployment
    constructor() {
        wasteAdmin = 0xf03FD6684637416723715871221180BC5D912BD4;
    }

    // Struct to represent waste records
    struct Waste {
        address payable disposer;
        string wasteType; // Store the waste type as an integer (0 for Plastic, 1 for Metal)
        string collectionLocation;
        uint256 weight;
        bool isRecorded;
        bool isValidated;
        bool isPaid;
        uint256 wasteAmount;
    }



    // Struct to represent information about disposers
    struct Disposer {
        string name;
        uint256 userId;
        string location;
        string email;
        address payable walletAddress;
    }

    // Mapping to store waste records
    mapping(uint256 => Waste) public wasteRecords;

    // Mapping to store information about disposers
    mapping(uint256 => Disposer) public disposers;


    // Address of the waste admin
    address payable public wasteAdmin;

    // Counter to track the number of registered disposers
    uint256 public disposerCounter; 
    uint256 public wasteCounter;

    // Events
    event WasteRecorded(uint256 indexed wasteId, address disposer, string wasteType, string collectionLocation, uint256 weight, uint256 wasteAmount);
    event WasteValidated(uint256 indexed wasteId, address indexed wasteAdmin);
    event PaymentSent(address indexed recipient, uint256 amount);
    event FundsWithdrawn(address indexed wasteAdmin, uint256 amount);
    event FundsDeposited(address indexed wasteAdmin, uint256 amount);
    event DisposerRegistered(uint256 indexed disposerId, string name, string location, address walletAddress);


    // Modifier to restrict access to the waste admin
    modifier onlyWasteAdmin() {
        require(msg.sender == wasteAdmin, "Only the waste admin can perform this action");
        _;
    }

    function getAdminAddress() external view returns (address) {
        require(wasteAdmin != address(0), "Waste Admin is not set");

        return wasteAdmin;
    }


    // Function for registering a Disposer
    function registerDisposer(string memory _name, string memory _location, string memory _email, address payable _walletAddress) public {
        require(_walletAddress != address(0), "Invalid wallet address");

        uint256 disposerIndex = disposerCounter++;
        disposers[disposerIndex] = Disposer(_name, disposerIndex, _location, _email, _walletAddress);
        emit DisposerRegistered(disposerIndex, _name, _location, _walletAddress);
    }


    // Function to record waste information
    function recordWaste(address payable  _disposer,string memory _wasteType, string memory _collectionLocation, uint256 _weight, uint256 _wasteAmount) public {
        wasteRecords[wasteCounter++] = Waste(_disposer, _wasteType, _collectionLocation, _weight, true, false, false, _wasteAmount);

        emit WasteRecorded(wasteCounter, _disposer, _wasteType, _collectionLocation, _weight, _wasteAmount);
    }
    
    // Function for the waste admin to know if the waste recorded waste is validated
    function validateWaste(uint256 _wasteId) public onlyWasteAdmin {
        require(_wasteId <= wasteCounter, "Invalid waste ID");
        require(wasteRecords[_wasteId].isRecorded, "Waste is not yet recorded");
        require(!wasteRecords[_wasteId].isValidated, "Waste is already validated");

        emit WasteValidated(_wasteId, msg.sender);
        
    }


    // Funtion for waste Admin to send payment to hospital
    function wastePayment(uint256 _disposerId, uint256 _wasteId, address _wasteAdmin, uint256 amount) external onlyWasteAdmin  {
        require(!wasteRecords[_wasteId].isValidated, "Waste is already validated");

    // Use the ERC-20 token address stored in the contract
        IToroTokenERC20(_wasteAdmin).transferFrom(
            msg.sender,
            disposers[_disposerId].walletAddress,
            amount
        );


        wasteRecords[_wasteId].isValidated = true;
        wasteRecords[_wasteId].isPaid = true;
    }


    // Function for the waste admin to withdraw funds from the contract
    function withdrawFunds(uint256 _amount) public onlyWasteAdmin {
        uint256 withdrawalAmount = _amount * 1 ether; // Convert the amount from Ether to wei

        require(withdrawalAmount <= address(this).balance, "Insufficient contract balance");

        wasteAdmin.transfer(withdrawalAmount);
        emit FundsWithdrawn(wasteAdmin, withdrawalAmount);
    }

    // Function to get waste information by waste ID
    function getWasteInfo(uint256 _wasteId) public view returns (
        address,
        string memory,
        string memory,
        uint256,
        bool,
        bool,
        bool,
        uint256
    ) {
        // require(_wasteId <= wasteCounter && _wasteId > 0, "Invalid waste ID");

        Waste storage waste = wasteRecords[_wasteId];

        return (
            waste.disposer,
            waste.wasteType,
            waste.collectionLocation,
            waste.weight,
            waste.isRecorded,
            waste.isValidated,
            waste.isPaid,
            waste.wasteAmount
        );
    }

     // Function to get the total number of registered hospitals
    function getWasteLenght() public view returns (uint256) {
        return (wasteCounter);
    }

    // Function to get information about a specific hospital by hospital ID
    function getDisposerInfo(uint256 _disposerId) public view returns (string memory, string memory, string memory, address) {
        require(_disposerId <= disposerCounter && _disposerId > 0, "Invalid hospital ID");

        Disposer storage disposer = disposers[_disposerId];

        return (
            disposer.name,
            disposer.location,
            disposer.email,
            disposer.walletAddress
        );
    }

    function getAllDisposers() public view returns (Disposer[] memory) {
        Disposer[] memory allDisposers = new Disposer[](disposerCounter);

        for (uint256 i = 0; i < disposerCounter; i++) {
            allDisposers[i] = disposers[i];
        }

        return allDisposers;
    }

    
    // Fallback function to receive funds
    receive() external payable {}
}