const Web3 = require('web3');

var provider = new Web3.providers.HttpProvider('http://localhost:8545');
var contract = require('truffle-contract');

var myContract = contract({
	abi: './build/contracts/DINRegistry.json',
});

myContract.setProvider(provider);
var deployed;

myContract.deployed()
	.then(function(instance) {
		var deployed = instance;
		return instance.newDINRegistration();
	})
	.then(function(result) {
		console.log(result);
	})