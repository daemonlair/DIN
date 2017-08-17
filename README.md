# DIN
A Distributed Identification Number (DIN) is a globally unique number that is short enough to be encoded into a 1-dimensional barcode. Because they are unique, DINs can be used as product identiers similar to [UPC](https://en.wikipedia.org/wiki/Universal_Product_Code), [EAN](https://en.wikipedia.org/wiki/International_Article_Number), and [ISBN](https://en.wikipedia.org/wiki/International_Standard_Book_Number) standards.

DINs can also be used to store and look up product information on the public Ethereum blockchain, using a simple three-step process:
* Register a new DIN using the `DINRegistry.sol` smart contract.
* Use the `PublicProductResolver.sol` contract or create your own resolver contract to store product information.
* Update the DIN registry with the address of your DIN's resolver constract.

For the beta version (which is deployed to the Ropsten TestNet), we've tried to keep things as simple as possible.
* DINs are 8-digit numbers beginning with `10000001` that are registered sequentially.
* DINs do not include a checksum digit at the end (common for barcodes).
* DINs do not encode any information directly (e.g., country, manufacturer ID, or product ID).
* There is a single standard resolver interface called `Product` that should be used to store product information.
* It is free, besides gas costs, to register a new DIN.

In future versions, we plan to address issues like checksum, manufacturer IDs, and adding client-side support for new interfaces that are decided by the community (which might include things like Coupon, Book, Film, etc.).

## Quick Start

* [Search a Known DIN](docs/quickstart-search.md)
* [Register a New DIN](docs/quickstart-register.md)
* [Add a Product Using the Public Resolver](docs/quickstart-public-resolver.md)

## DINRegistry.sol

This is the main contract, which allows anyone to register a new DIN, transfer ownership of a DIN, and update an owned DIN's resolver address.

Address (Ropsten): `0xcee847df50cf2a798e33e5a7282684255869eccf`

## Resolvers

Resolvers are standard interfaces that can be used to store information about a DIN on the blockchain. A resolver, by definition, must have a method called supportsInterface to tell DIN clients what kind of information it stores (like name, brand, manufacturer, etc.) as well as a public property called resolverInterface that specifies the full resolver interface. Check out [PublicProductResolver](contracts/PublicProductResolver.sol) to see how the interface hashes are calculated.

Currently, the only interface is `Product`, but more will be added soon.

| Interface                         | Interface Hash | Public Resolver Address (Ropsten)            |
| --------------------------------- | ---------------| -------------------------------------------- |
| [Product](interfaces/Product.sol) | 0x4c831a1f     | `0xb8ab8e1fb64325447d025bd7c08dfd6134b7d11f` |

## Interface IDs

Interface IDs are the individual properties that make up a larger resolver interface.

| Interface Name                    | Interface Hash |
| --------------------------------- | ---------------|
| `Name`                            | 0x00ad800c     |
| `RetailURL`                       | 0x90af830d     |
| `ImageURL`                        | 0x4f5cad01     |
| `Category`                        | 0x253eca1f     |
| `Brand`                           | 0xbedf7e19     |
| `Manufacturer`                    | 0xa43271b9     |
| `Color`                           | 0xd4e28c9c     |
| `Model`                           | 0x4c5770d9     |
| `UPC`                             | 0x2266a58e     |
| `EAN`                             | 0x9b2e8e30     |
| `Description`                     | 0x2c5f13e0     |

## Clients

Clients are user interfaces that allow users to interact with the Ethereum blockchain to register DINs, search for DINs, and update product information. We're currently working on web and mobile clients (coming soon!). Since this project is open-source, anyone can create their own client that supports any resolver interface.

## Acknowledgements

We based the DIN Registry and Resolver smart contracts to a large extent on the [Ethereum Name Service (ENS)](https://github.com/ethereum/ens) contracts published by the [Ethereum Foundation](https://ethereum.org/).

## Contributors
* [Rich McAteer](https://github.com/richmcateer)
* [Dan Kindler](https://github.com/dkindler)

