/**
 * Create asset
 * Sender pays receiver an amount of coin.
 * you can specify more than one receiver and use custom asset and custom memo
 * @param {string} issuer - The private key of the issuer.      
 * @param {string} distributor - The public key of the distributor
 * @param {string} amount - The amount of coins that sender pays to receiver 
 * @param {string} assetCode - The assetCode of the asset that you want to trust
 * @param {string} issuer - The amount of coin that you want to trust from this issuer
 * @param {string} memoType - The type of memo of the transaction that you want create (text,id,return)
 * @param {string} memo - The content of memo  of the change trust transaction that you want create (text,id,return)
 * 
 * 
 */

async function createAsset(issuer, distributor, amount, assetCode, memoTypeTrust = 'text', memoTrust = 'default', memoTypePay = 'text', memoPay = 'default') {
    return new Promise((resolve, reject) => {
        let accountop = require('./accountOperations')
        let paymentop = require('./paymentOperations')
        let config = require('./config')
        let server
        let env = config.env
        let StellarSdk = require('stellar-sdk')
        if (typeof env != 'undefined' && env === "testnet") {
            server = new StellarSdk.Server(config.testnet_horizon)
            StellarSdk.Network.useTestNetwork()
        } else {
            server = new StellarSdk.Server(config.pubnet_horizon)
            StellarSdk.Network.usePublicNetwork()
        }
        issuer = StellarSdk.Keypair.fromSecret(issuer)
        distributor = StellarSdk.Keypair.fromSecret(distributor)
        accountop.changeTrust(distributor.secret(), issuer.publicKey(), assetCode, amount)
            .then(function (res) {
                paymentop.Pay(issuer.secret(), distributor.publicKey(), amount, assetCode, issuer.publicKey())
                    .then(function (res) {
                        resolve('Asset created')
                    })
                    .catch(function (err) {
                        reject('StellarBurrito_TX_ERR payment error, check keys\n\r' + err)
                    })
            })
            .catch(function (err) {
                console.log(err)
                reject('StellarBurrito_TX_ERR trust_op error\n\r' + err)
            })
    })
}
module.exports = {
    createAsset
}