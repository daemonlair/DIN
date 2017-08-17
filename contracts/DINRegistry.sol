pragma solidity ^0.4.11;

/**
*  This contract is the Distributed Identification Number (DIN) registry.
*/
contract DINRegistry {

    struct Record {
        address owner; // Address that registers the DIN
        address resolver; // Address of the resolver contract
    }

    // DIN => Record
    mapping (uint256 => Record) records;

    // The latest DIN registered. This increments before a new DIN is registered.
    uint256 index;

    // Logged when a new DIN is registered.
    event NewRegistration(uint256 indexed DIN, address indexed owner);

    // Logged when the owner of a DIN transfers ownership to a new account.
    event NewOwner(uint256 indexed DIN, address indexed owner);

    // Logged when the resolver for a DIN changes.
    event NewResolver(uint256 indexed DIN, address indexed resolver);

    /**
    * Only the owner of the specified DIN may call functions with this modifier
    */
    modifier only_owner(uint256 DIN) {
        if (records[DIN].owner != msg.sender) throw;
        _;
    }

    /**
     * Constructs a new DIN registry.
     * @param genesis The start index for DIN numbering.
     */
    function DINRegistry(uint256 genesis) {
        index = genesis;
    }

    /**
     * Returns the address that owns the specified DIN.
     */
    function owner(uint256 DIN) constant returns (address) {
        return records[DIN].owner;
    }

    /**
     * Returns the address of the resolver for the specified DIN.
     */
    function resolver(uint256 DIN) constant returns (address) {
        return records[DIN].resolver;
    }

    /**
     * Registers a new DIN for the specified address.
     * @param owner The owner of the new DIN.
     */
    function registerNewDINFor(address owner) {
        register(owner);
    }

    /**
     * Registers a new DIN to the address that calls this function.
     */
    function registerNewDIN() {
        register(msg.sender);
    }

    /**
     * Sets the owner address for the specified DIN
     * @param DIN The DIN to update.
     * @param owner The address of the new owner.
     */
    function setOwner(uint256 DIN, address owner) only_owner(DIN) {
        records[DIN].owner = owner;
        NewOwner(DIN, owner);
    }

    /**
     * Sets the resolver address for the specified DIN.
     * @param DIN The DIN to update.
     * @param resolver The address of the resolver.
     */
    function setResolver(uint256 DIN, address resolver) only_owner(DIN) {
        records[DIN].resolver = resolver;
        NewResolver(DIN, resolver);
    }

    // Helper function
    function register(address owner) private {
        // Increment the DIN index
        uint256 curIndex = ++index;
        // Register the DIN to the address that calls this function
        records[curIndex].owner = owner;
        NewRegistration(curIndex, owner);
    }
}
