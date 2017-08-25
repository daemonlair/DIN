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
var logger = null;
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

		// web3.personal.unlockAccount(this.account,"itsthenewone");
        web3.eth.defaultAccount = this.account;
        // console.log(web3.eth.defaultAccount);
        return DINRegistryInstance.registerNewDIN({from: this.account})
			.then(function () {
				console.log(logger.args.DIN.toString());
				event.stopWatching();
				return logger.args.DIN.toString();
			})
        // return logger.args.DIN.toString();
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