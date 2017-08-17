## Register a New DIN

Start an Ethereum Javascript environment and sync the Ropsten TestNet blockchain. A simple way to do this is with the web3 object injected by [MetaMask](https://metamask.io/) in the Google Chrome console.

Get the DIN registry contract
```javascript
var abi = [{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"resolver","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"address"}],"name":"registerNewDINFor","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"DIN","type":"uint256"},{"name":"owner","type":"address"}],"name":"setOwner","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"DIN","type":"uint256"}],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"registerNewDIN","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"DIN","type":"uint256"},{"name":"resolver","type":"address"}],"name":"setResolver","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"genesis","type":"uint256"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"DIN","type":"uint256"},{"indexed":true,"name":"owner","type":"address"}],"name":"NewRegistration","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"DIN","type":"uint256"},{"indexed":true,"name":"owner","type":"address"}],"name":"NewOwner","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"DIN","type":"uint256"},{"indexed":true,"name":"resolver","type":"address"}],"name":"NewResolver","type":"event"}]
var registryAddress = "0xcee847df50cf2a798e33e5a7282684255869eccf"
var registry = web3.eth.contract(abi).at(registryAddress)
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

Get notified when a registration event happens
```javascript
var event = registry.NewRegistration({owner: web3.eth.accounts[0]})
event.watch(callback)
```

Register a new DIN for yourself
```javascript
registry.registerNewDIN(callback)
```

Check the event log to see what DIN you registered
```javascript
Object {address: "0xcee847df50cf2a798e33e5a7282684255869eccf", blockNumber: 1264071, transactionHash: "0x4cacb043cea3587c6c4376a7b23605a171e562dea339848f3f47b750475a4392", transactionIndex: 2, blockHash: "0x80eda5148eac65e9a036943d65f9fc0faf41cce31b7e4df4075a4719e17be2f0"…}
  address:"0xcee847df50cf2a798e33e5a7282684255869eccf"
   args:Object
     DIN:e
       c:Array(1)
         0:10000001 // This is your DIN
...
```

Verify that you are the owner of this DIN
```javascript
registry.owner(10000001, callback)
0x308dd21bdf208c5352ab1088cc544ff8b44f299a
```
