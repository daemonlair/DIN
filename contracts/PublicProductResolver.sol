pragma solidity ^0.4.11;

import './DINRegistry.sol';

/**
*  This is a public resolver that supports the Product interface.
*/
contract PublicProductResolver {

    // bytes4(sha3("name(uint256)", "retailURL(uint256)", ..., "description(uint256)"))
    bytes4 public resolverInterface = 0x4c831a1f;

    // Interfaces
    bytes4 constant NAME_INTERFACE_ID = 0x00ad800c; // bytes4(sha3("name(uint256)"))
    bytes4 constant RETAIL_URL_INTERFACE_ID = 0x90af830d;
    bytes4 constant IMAGE_URL_INTERFACE_ID = 0x4f5cad01;
    bytes4 constant CATEGORY_INTERFACE_ID = 0x253eca1f;
    bytes4 constant BRAND_INTERFACE_ID = 0xbedf7e19;
    bytes4 constant MANUFACTURER_INTERFACE_ID = 0xa43271b9;
    bytes4 constant COLOR_INTERFACE_ID = 0xd4e28c9c;
    bytes4 constant MODEL_INTERFACE_ID = 0x4c5770d9;
    bytes4 constant UPC_INTERFACE_ID = 0x2266a58e;
    bytes4 constant EAN_INTERFACE_ID = 0x9b2e8e3;
    bytes4 constant DESCRIPTION_INTERFACE_ID = 0x2c5f13e;

    struct Product {
        string name;            // Tile Slim White - Tile Trackers & Locators
        string retailURL;       // https://www.thetileapp.com/en-us/store/tiles/slim
        string imageURL;        // https://static-www.thetileapp.com/images/slim_pdp_hero2.jpg
        string category;        // Cell Phone Accessories
        string brand;           // Tile
        string manufacturer;    // Tile
        string color;           // White
        string model;           // EC-04001
        uint UPC;               // 859553005297
        uint EAN;               // 0859553005297
        string description;     // Slim White. The thinnest Bluetooth tracker that finds everyday items in seconds.
    }

    DINRegistry dinRegistry;

    // DIN => Product
    mapping (uint256 => Product) products;

    // Events
    event NameChanged(uint256 indexed DIN, string name);
    event RetailURLChanged(uint256 indexed DIN, string retailURL);
    event ImageURLChanged(uint256 indexed DIN, string imageURL);
    event CategoryChanged(uint256 indexed DIN, string category);
    event BrandChanged(uint256 indexed DIN, string brand);
    event ManufacturerChanged(uint256 indexed DIN, string manufacturer);
    event ColorChanged(uint256 indexed DIN, string color);
    event ModelChanged(uint256 indexed DIN, string model);
    event UPCChanged(uint256 indexed DIN, uint UPC);
    event EANChanged(uint256 indexed DIN, uint EAN);
    event DescriptionChanged(uint256 indexed DIN, string description);

    /**
    * Returns true if the resolver implements the interface specified by the provided hash.
    * @param interfaceID The ID of the interface to check for.
    * @return True if the contract implements the requested interface.
    */
    function supportsInterface(bytes4 interfaceID) returns (bool) {
        return interfaceID == NAME_INTERFACE_ID ||
               interfaceID == RETAIL_URL_INTERFACE_ID ||
               interfaceID == IMAGE_URL_INTERFACE_ID ||
               interfaceID == CATEGORY_INTERFACE_ID ||
               interfaceID == BRAND_INTERFACE_ID ||
               interfaceID == MANUFACTURER_INTERFACE_ID ||
               interfaceID == COLOR_INTERFACE_ID ||
               interfaceID == MODEL_INTERFACE_ID ||
               interfaceID == UPC_INTERFACE_ID ||
               interfaceID == EAN_INTERFACE_ID ||
               interfaceID == DESCRIPTION_INTERFACE_ID;
    }

    // Only the DIN owner may change product information
    modifier only_owner(uint256 DIN) {
        if (dinRegistry.owner(DIN) != msg.sender) throw;
        _;
    }

    /**
     * Constructor.
     * @param dinRegistryAddr The address of the DIN registry contract.
     */
    function PublicProductResolver(DINRegistry dinRegistryAddr) {
        dinRegistry = dinRegistryAddr;
    }

    // Name
    function name(uint256 DIN) constant returns (string) {
        return products[DIN].name;
    }

    function setName(uint256 DIN, string name) only_owner(DIN) {
        products[DIN].name = name;
        NameChanged(DIN, name);
    }

    // RetailURL
    function retailURL(uint256 DIN) constant returns (string) {
        return products[DIN].retailURL;
    }

    function setRetailURL(uint256 DIN, string retailURL) only_owner(DIN) {
        products[DIN].retailURL = retailURL;
        RetailURLChanged(DIN, retailURL);
    }

    // ImageURL
    function imageURL(uint256 DIN) constant returns (string) {
        return products[DIN].imageURL;
    }

    function setImageURL(uint256 DIN, string imageURL) only_owner(DIN) {
        products[DIN].imageURL = imageURL;
        ImageURLChanged(DIN, imageURL);
    }

    // Category
    function category(uint256 DIN) constant returns (string) {
        return products[DIN].category;
    }

    function setCategory(uint256 DIN, string category) only_owner(DIN) {
        products[DIN].category = category;
        NameChanged(DIN, category);
    }

    // Brand
    function brand(uint256 DIN) constant returns (string) {
        return products[DIN].brand;
    }

    function setBrand(uint256 DIN, string brand) only_owner(DIN) {
        products[DIN].brand = brand;
        BrandChanged(DIN, brand);
    }

    // Manufacturer
    function manufacturer(uint256 DIN) constant returns (string) {
        return products[DIN].manufacturer;
    }

    function setManufacturer(uint256 DIN, string manufacturer) only_owner(DIN) {
        products[DIN].manufacturer = manufacturer;
        ManufacturerChanged(DIN, manufacturer);
    }

    // Color
    function color(uint256 DIN) constant returns (string) {
        return products[DIN].color;
    }

    function setColor(uint256 DIN, string color) only_owner(DIN) {
        products[DIN].color = color;
        ColorChanged(DIN, color);
    }

    // Model
    function model(uint256 DIN) constant returns (string) {
        return products[DIN].model;
    }

    function setModel(uint256 DIN, string model) only_owner(DIN) {
        products[DIN].model = model;
        ColorChanged(DIN, model);
    }

    // UPC
    function UPC(uint256 DIN) constant returns (uint) {
        return products[DIN].UPC;
    }

    function setUPC(uint256 DIN, uint UPC) only_owner(DIN) {
        products[DIN].UPC = UPC;
        UPCChanged(DIN, UPC);
    }

    // EAN
    function EAN(uint256 DIN) constant returns (uint) {
        return products[DIN].EAN;
    }

    function setEAN(uint256 DIN, uint EAN) only_owner(DIN) {
        products[DIN].EAN = EAN;
        EANChanged(DIN, EAN);
    }

    // Description
    function description(uint256 DIN) constant returns (string) {
        return products[DIN].description;
    }

    function setDescription(uint256 DIN, string description) only_owner(DIN) {
        products[DIN].description = description;
        DescriptionChanged(DIN, description);
    }

}
