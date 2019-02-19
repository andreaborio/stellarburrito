let config = require('./config')
let server
let env = config.env
let StellarSdk = require('stellar-sdk')
let accountop = require('./accountOperations')
let Pay= require('./paymentOperations')
if (typeof env != 'undefined' && env === "testnet") {
    StellarSdk.Network.useTestNetwork()
    server = new StellarSdk.Server(config.testnet_horizon)
} else {
    StellarSdk.Network.usePublicNetwork()
    server = new StellarSdk.Server(config.pubnet_horizon)
}
/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
/**
 * Create asset
 * Sender pays receiver an amount of coin.
 * you can specify more than one receiver and use custom asset and custom memo
 * @param {string} issuer - The private key of the issuer.      
 * @param {string} distributor - The secret key of the distributor
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
        issuer = StellarSdk.Keypair.fromSecret(issuer)
        distributor = StellarSdk.Keypair.fromSecret(distributor)
        accountop.changeTrust(distributor.secret(), issuer.publicKey(), assetCode, amount, memoTypeTrust, memoTrust)
            .then(function (res) {
                Pay(issuer.secret(), distributor.publicKey(), amount, assetCode, issuer.publicKey(), memoTypePay, memoPay)
                    .then(function (res) {
                        resolve('Asset created')
                    })
                    .catch(function (err) {
                        console.log(err)
                        reject('StellarBurrito_TX_ERR payment error, check keys\n\r' + err)
                        return
                    })
            })
            .catch(function (err) {
                reject('StellarBurrito_TX_ERR trust_op error\n\r' + err)
                return
            })
    })
}
/**
 * @param {Number} cursor - Use as page index for explore all assets
 * @param {Number} limit  - How much assets you want back
 */
async function getAssets(cursor = 1, limit = 10) {
    return new Promise((resolve, reject) => {
        server.assets()
            .limit(limit)
            .cursor(cursor)
            .call()
            .then(function (page) {
                resolve(page)
            })
            .catch(function (error) {
                reject(error)
            })
    })
}
/**
 * @param {Number} assetCode  - Asset code
 * @param {string} assetIssuer - Asset Issuer
 */
async function getAssetInfo(assetCode, assetIssuer) {
    return new Promise((resolve, reject) => {
        let asset
        try {
            asset = new StellarSdk.Asset(assetCode, assetIssuer)
        } catch (err) {
            reject(err)
            return
        }
        server.assets()
            .call()
            .then(function (page) {
                resolve(page)
            })
            .catch(function (error) {
                reject(error)
            })
    })
}
/**
 * @param {string} assetIssuer - Asset Issuer
 */
async function getAssetsForIssuer(assetIssuer) {
    return new Promise((resolve, reject) => {
        server.assets()
            .forIssuer(assetIssuer)
            .call()
            .then(function (page) {
                resolve(page)
            })
            .catch(function (error) {
                reject(error)
            })
    })
}
module.exports = {
    createAsset,
    getAssets,
    getAssetInfo,
    getAssetsForIssuer
}