        /**
         * Change HERE your horizon server params
         * @param {string} pubnet_horizon - Address of your horizon istance for publicnet, by default horizon.stellar.org   
         * @param {string} testnet_horizon - Address of your horizon istance for testnet, by default horizon.stellar.org   
         */
module.exports.init = async function (pubnet_horizon='https://horizon.stellar.org',testnet_horizon='https://horizon-testnet.stellar.org') {
   return new Promise((resolve, reject) => {
      const StellarSdk = require('stellar-sdk');
      var server = new StellarSdk.Server(pubnet_horizon)
      StellarSdk.Network.usePublicNetwork()
      let pub = {
         server,
         StellarSdk
      }
      server = new StellarSdk.Server(testnet_horizon)
      StellarSdk.Network.useTestNetwork()
      let test = {
         server,
         StellarSdk
      }
      let global = {
         pub,
         test
      }
      resolve(global)
   })
};