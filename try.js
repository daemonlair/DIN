var Web3 = require('web3');
var fs = require("fs");
var Artifactor = require("truffle-artifactor");
var provider = new Web3.providers.HttpProvider("http://localhost:8545");
var contract = require("truffle-contract");
var temp = require("temp").track();
var path = require("path");
var requireNoCache = require("require-nocache")(module);

var toAddress = null;
var toAmount = 0;
var web3 = null;
var web3Provider = null;
var balance = 0;
var contracts = {};
var account = null;
var callback = function(error, result) {
  if (!error) {
  	// console.log(result)
	  logger = result;
  } else {
    console.log(error)
  }
}

function getProvider() {
  if (web3 !== null) {
    web3Provider = web3.currentProvider;
    web3 = new Web3(web3Provider);
  } else {
    web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    web3 = new Web3(web3Provider);
  }
}

function getContract() {
  var DINRegistryArtifact = require('./build/contracts/DINRegistry.json');
  contracts.DINRegistry = contract(DINRegistryArtifact);
  contracts.DINRegistry.setProvider(web3Provider);
  networkCheck();
  getNewDIN();
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
  });
}

function getNewDIN() {
  // console.log('getting balances...')
  web3.eth.getAccounts((error, accounts) => {
    if (error) {
      console.log(error)
      return
    }
    this.account = accounts[0]
    
    // console.log(contracts.DINRegistry);
    contracts.DINRegistry.at("0x3c8b149bb67c2e050d8ae0b17c98a5b2259d0c1d")
      .then(function(instance) {
        var DINRegistryInstance = instance;

        var event = DINRegistryInstance.NewRegistration({owner: this.account});
        event.watch(callback);

        // const filter = web3.eth.filter({
        //   fromBlock: 0,
        //   toBlock: 'latest',
        //   address: '0xdcdf10e828efb0db2ad9e2cc9b78d14a135a5ec8',
        //   topics: [web3.sha3('NewRegistration(uint256, address)')]
        // });
		//
        // filter.watch((error, result) => {
        //   if(!error) {
        //     console.log(result);
        //   } else {
        //     console.log(error);
        //   }
        // })
        // console.log(event);

		// web3.personal.unlockAccount(this.account,"itsthenewone");
        web3.eth.defaultAccount = this.account;
        // console.log(web3.eth.defaultAccount);
        DINRegistryInstance.registerNewDIN({from: this.account});
        console.log(logger.args);
        return 10001;
      })
      .then((result) => {
    	return result;
        // console.log('new din is ' + result);
      })
      .catch((err) => {
        console.log(err.message)
      })
  })
}

getProvider()
getContract()