module.exports.test = async function () {
   return new Promise((resolve, reject) => {
      const StellarSdk = require('stellar-sdk');
      var server = new StellarSdk.Server('https://horizon.stellar.org')
      StellarSdk.Network.usePublicNetwork()
      let public = {
         server,
         StellarSdk
      }
      server = new StellarSdk.Server('https://horizon-testnet.stellar.org')
      StellarSdk.Network.useTestNetwork()
      let testnet = {
         server,
         StellarSdk
      }
      let global = {
         public,
         testnet
      }
      resolve(global)
   })
};