module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
        network_id: 4,
        host: '127.0.0.1',
        port: 8545,
        gas: 4000000,
        from: '0x72cEB2053d3ac4880DD7454B81a63Bca4BC1aEfa'
    }
  }
};
