// web3 is an Ethereum client library
var Web3 = require('web3');
var web3;
var DINConn = '';
var DINInst = '';
var callback = function(error, result) {if (!error) {console.log(result)} else {console.log(error)}};

var contracts = {};
var web3Provider = null;
function connectToDINContract(url, address) {
	if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        web3Provider = web3.currentProvider;
        web3 = new Web3(web3Provider);
    } else {
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        web3Provider = new Web3.providers.HttpProvider('http://localhost:8545')
        web3 = new Web3(this.web3Provider);
    }

    var DINRegistryArtifact = require('./build/contracts/DINRegistry.json').abi;
    contracts.DINRegistryI = new web3.eth.contract(DINRegistryArtifact);
    console.log(contracts);
    contracts.DINRegistryI.setProvider(web3Provider);
    networkCheck();
    // getBalances();
}

function networkCheck() {
    web3.version.getNetwork((err, netId) => {
        if (err) {
          console.log(err)
          return
        }
        switch (netId) {
          case '1':
            console.log('This is mainnet')
            break
          case '2':
            console.log('This is the deprecated Morden test network.')
            break
          case '3':
            console.log('This is the ropsten test network.')
            break
          default:
            console.log('This is an unknown network.')
        }
    })
}

function createNewDIN() {
	var event = DINConn.registerNewDIN();
	event.watch(callback);
	DINConn.registerNewDIN(callback);
}

connectToDINContract('http://localhost:8545', '0x866173830a1701e2a0ce2cc73e4d28cbc3d22db0');
// createDINRegistry(10000000);
// createNewDIN();