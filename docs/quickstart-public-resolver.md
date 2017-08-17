## Add a Product Using the Public Resolver

Start an Ethereum Javascript environment and sync the Ropsten TestNet blockchain. A simple way to do this is with the web3 object injected by [MetaMask](https://metamask.io/) in the Google Chrome console.

Get the public product resolver contract
```javascript
var abi = [{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"interfaceID","type":"bytes4"}],"name":"supportsInterface","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"DIN","type":"uint256"},{"name":"brand","type":"string"}],"name":"setBrand","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"UPC","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"category","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"DIN","type":"uint256"},{"name":"description","type":"string"}],"name":"setDescription","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"description","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"DIN","type":"uint256"},{"name":"UPC","type":"uint256"}],"name":"setUPC","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"DIN","type":"uint256"},{"name":"EAN","type":"uint256"}],"name":"setEAN","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"model","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"imageURL","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"DIN","type":"uint256"},{"name":"retailURL","type":"string"}],"name":"setRetailURL","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"retailURL","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"EAN","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"manufacturer","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"DIN","type":"uint256"},{"name":"color","type":"string"}],"name":"setColor","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"DIN","type":"uint256"},{"name":"model","type":"string"}],"name":"setModel","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"brand","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"DIN","type":"uint256"},{"name":"manufacturer","type":"string"}],"name":"setManufacturer","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"DIN","type":"uint256"},{"name":"category","type":"string"}],"name":"setCategory","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"color","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"DIN","type":"uint256"},{"name":"imageURL","type":"string"}],"name":"setImageURL","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"resolverInterface","outputs":[{"name":"","type":"bytes4"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"DIN","type":"uint256"},{"name":"name","type":"string"}],"name":"setName","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"dinRegistryAddr","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"DIN","type":"uint256"},{"indexed":false,"name":"name","type":"string"}],"name":"NameChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"DIN","type":"uint256"},{"indexed":false,"name":"retailURL","type":"string"}],"name":"RetailURLChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"DIN","type":"uint256"},{"indexed":false,"name":"imageURL","type":"string"}],"name":"ImageURLChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"DIN","type":"uint256"},{"indexed":false,"name":"category","type":"string"}],"name":"CategoryChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"DIN","type":"uint256"},{"indexed":false,"name":"brand","type":"string"}],"name":"BrandChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"DIN","type":"uint256"},{"indexed":false,"name":"manufacturer","type":"string"}],"name":"ManufacturerChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"DIN","type":"uint256"},{"indexed":false,"name":"color","type":"string"}],"name":"ColorChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"DIN","type":"uint256"},{"indexed":false,"name":"model","type":"string"}],"name":"ModelChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"DIN","type":"uint256"},{"indexed":false,"name":"UPC","type":"uint256"}],"name":"UPCChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"DIN","type":"uint256"},{"indexed":false,"name":"EAN","type":"uint256"}],"name":"EANChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"DIN","type":"uint256"},{"indexed":false,"name":"description","type":"string"}],"name":"DescriptionChanged","type":"event"}]
var resolverAddress = "0xb8ab8e1fb64325447d025bd7c08dfd6134b7d11f"
var resolver = web3.eth.contract(abi).at(resolverAddress)
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

Set product information for a DIN that you own
```javascript
resolver.setName(10000001, "Blue T-Shirt", callback)
resolver.setColor(10000001, "Blue", callback)
resolver.setDescription(10000001, "This is an example", callback)
...
```

Verify that the product has been updated
```javascript
resolver.name(10000001, callback)
"Blue T-Shirt"

resolver.color(10000001, callback)
"Blue"

resolver.description(10000001, callback)
"This is an example"
```

Update the DIN registry with the public resolver address
```javascript
var abi = [{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"resolver","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"}],"name":"registerNewDINFor","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"DIN","type":"uint256"},{"name":"owner","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"registerNewDIN","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"DIN","type":"uint256"},{"name":"resolver","type":"address"}],"name":"setResolver","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"genesis","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"DIN","type":"uint256"},{"indexed":true,"name":"owner","type":"address"}],"name":"NewRegistration","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"DIN","type":"uint256"},{"indexed":true,"name":"owner","type":"address"}],"name":"NewOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"DIN","type":"uint256"},{"indexed":true,"name":"resolver","type":"address"}],"name":"NewResolver","type":"event"}]
var registryAddress = "0xcee847df50cf2a798e33e5a7282684255869eccf"
var registry = web3.eth.contract(abi).at(registryAddress)
registry.setResolver(10000001, resolverAddress, callback)
```

Verify that the registry has been updated
```javascript
registry.resolver(10000001, callback)
0xb8ab8e1fb64325447d025bd7c08dfd6134b7d11f
```
