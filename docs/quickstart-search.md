## Search a Known DIN

Start an Ethereum Javascript environment and sync the Ropsten TestNet blockchain. A simple way to do this is with the web3 object injected by [MetaMask](https://metamask.io/) in the Google Chrome console.

Get the DIN registry contract
```javascript
var abi = [{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"resolver","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"}],"name":"registerNewDINFor","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"DIN","type":"uint256"},{"name":"owner","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"registerNewDIN","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"DIN","type":"uint256"},{"name":"resolver","type":"address"}],"name":"setResolver","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"genesis","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"DIN","type":"uint256"},{"indexed":true,"name":"owner","type":"address"}],"name":"NewRegistration","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"DIN","type":"uint256"},{"indexed":true,"name":"owner","type":"address"}],"name":"NewOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"DIN","type":"uint256"},{"indexed":true,"name":"resolver","type":"address"}],"name":"NewResolver","type":"event"}]
var ropstenAddress = "0xcee847df50cf2a798e33e5a7282684255869eccf"
var registry = web3.eth.contract(abi).at(ropstenAddress)
```

Set up a callback
```javascript
var callback = function(error, result) { 
  if (!error) {
    console.log(result)
  } else {
    console.log(error)
  }
}
```

Check the owner of this DIN
```javascript
registry.owner(10000001, callback)
0x308dd21bdf208c5352ab1088cc544ff8b44f299a
```

Check the address of the resolver contract
```javascript
registry.resolver(10000001, callback)
0xb8ab8e1fb64325447d025bd7c08dfd6134b7d11f
```

Get the resolver contract using the standard resolver ABI.
```javascript
var resolverABI = [{"constant":false,"inputs":[{"name":"interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"resolverInterface","outputs":[{"name":"","type":"bytes4"}],"payable":false,"type":"function"}]
var resolverAddress = "0xb8ab8e1fb64325447d025bd7c08dfd6134b7d11f"
var resolver = web3.eth.contract(resolverABI).at(resolverAddress)
```

Check the resolver's interface
```javascript
resolver.resolverInterface(callback)
0x4c831a1f
```

Figure out what kind of [resolver interface](https://github.com/richmcateer/DIN#resolvers) this hash represents. `0x4c831a1f` corresponds to `Product`.

Get the resolver contract, knowing it conforms to the `Product` interface
```javascript
var productABI = [{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"UPC","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"category","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"price","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"description","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"model","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"imageURL","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"retailURL","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"EAN","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"manufacturer","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"brand","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"color","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"}]
var product = web3.eth.contract(productABI).at(resolverAddress)
```

And finally, find out the product's details. If you can figure out what this product is, feel free to buy it!
```javascript
product.name(10000001, callback)
product.retailURL(10000001, callback)
product.description(10000001, callback)
...
```
