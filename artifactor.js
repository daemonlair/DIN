var Web3 = require('web3');
var fs = require("fs");
var Artifactor = require("truffle-artifactor");
var provider = new Web3.providers.HttpProvider("http://localhost:8545");
var contract = require("truffle-contract");
var temp = require("temp").track();
var path = require("path");
var requireNoCache = require("require-nocache")(module);


var abiVal = JSON.parse(fs.readFileSync('./build/contracts/DINRegistry.json'))

var contractData = {
	contract_name: "DINRegistry",
	abi: abiVal
}

var dirPath = temp.mkdirSync({
	dir: path.resolve("./"),
});

// console.log(dirPath);
// var expected_filepath = path.join(dirPath, "Example.json");
// console.log('path is ' + expected_filepath);

// console.log(abiVal);
var my_path = '/home/kapil/Music/DIN-master';
var expected_filepath = path.join(my_path, '/build/contracts/DINRegistry.json')

function artifactCreator() {
	const artifactor = new Artifactor(my_path);
	
	artifactor.save({
		contract_name: "DINRegistry",
		abi: abiVal
	}, "./DINRegistry.sol.js")
	.then(function() {
		console.log('Completed saving file!!');
	})
}

artifactCreator();
// .then(function() {
// 	var json = requireNoCache(expected_filepath);

// 	Example = contract(json);
// 	Example.setProvider(provider);
// 	console.log(Example);
// })	
