const Web3 = require('web3');
const connector = require('./try');


try {
	console.log(connector.methods.getBalances());
} catch(e) {
	console.log('[-] Error: ' + e);
}