var DINRegistry = artifacts.require("./DINRegistry.sol");
var Resolver = artifacts.require('./PublicProductResolver.sol');
module.exports = function(deployer) {
  deployer.deploy(DINRegistry, 10000000);
  deployer.deploy(Resolver);
};
