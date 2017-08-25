// web3 is an Ethereum client library
//var Web3 = require('web3');
var web3 = require("ethereum.js");

var DINConn = '';
var DINInst = '';
var callback = function (error, result) { if (!error) { console.log(result) } else { console.log(error) } };

function connectToDINContract(url) {
    try {
        web3.setProvider(new web3.providers.HttpProvider(url));
        const datasetAbi = require('./build/contracts/DINRegistry.json').abi;
        DINConn = new web3.eth.contract(datasetAbi);
    }
    catch (e) {
        console.error("Could not connect to dataset contract. Error: ", e);
    }

    finally {
        // cleanup
    }
}

function createNewDIN() {
    DINConn.registerDIN();
    //var event = DINConn.registerDIN();
    //event.watch(callback);
    //DINConn.registerNewDIN(callback);
}

connectToDINContract('http://localhost:8545');
// createDINRegistry(10000000);
//createNewDIN();