/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
/* eslint-disable no-magic-numbers */
let config = require('./config')
let server
let errorManager = require('./error')
let env = config.env
let StellarSdk = require('stellar-sdk')
if (typeof env != 'undefined' && env === "testnet") {
    StellarSdk.Network.useTestNetwork()
    server = new StellarSdk.Server(config.testnet_horizon)
} else {
    StellarSdk.Network.usePublicNetwork()
    server = new StellarSdk.Server(config.pubnet_horizon)
}
/**
 * Create Passive Offer function
 *  This is useful for offers just used as 1:1 exchanges for path payments. Use manage offer to manage this offer after using this operation to create it.
 * @param {string} privKey - The private key of the creator.      
 * @param {string} sellingCode -Asset code that you want to sell
 * @param {string} sellingIssuer - Issuer's publicKey of the Asset that you want to sell
 * @param {string} amount - The amount of coin that you want to sell
 * @param {JSON} price - Issuer's publicKey of the Asset that you want to sell
 * @param {string} offerId - If 0 create new offer
 * @param {string} buyingCode - Asset code that you want to buy
 * @param {string} buyingIssuer - Issuer's publicKey of the Asset that you want to sell
 * @param {string} source - The source account (defaults to transaction source).
 * @returns {JSON} result
 */
async function createPassiveOffer(privKey, sellingCode = 'native', sellingIssuer = 'native', amount = '0', price = { 'd': 1, 'n': 1 }, offerId = '0', buyingCode = 'native', buyingIssuer = 'native', source = 'unsetted') {
    return new Promise((resolve, reject) => {
        let buying, selling, des
        try {
            if (buyingCode == "native" || buyingIssuer == "native")
                buying = new StellarSdk.Asset.native()
            else
                buying = new StellarSdk.Asset(buyingCode, buyingIssuer)

        } catch (error) {
            reject('StellarBurrito_ASSET_ERR Buying \n\r' + error)
        }
        try {
            if (sellingCode == "native" || sellingCode == "native")
                selling = new StellarSdk.Asset.native()
            else
                selling = new StellarSdk.Asset(sellingCode, sellingIssuer)
        } catch (error) {
            reject('StellarBurrito_ASSET_ERR Selling \n\r' + error)
        }
        try { des = StellarSdk.Keypair.fromSecret(privKey) }
        catch (err) {
            reject(errorManager('keyPair', -1))
            return
        }
        server.loadAccount(des.publicKey())
            .then(function (sourceAccount) {
                let builder = new StellarSdk.TransactionBuilder(sourceAccount)
                    .addOperation(StellarSdk.Operation.createPassiveOffer({
                        selling,
                        buying,
                        amount,
                        price,
                        offerId
                    }))
                    .build()
                builder.sign(des)
                server.submitTransaction(builder)
                    .then(function (result) {
                        resolve(result)
                    })
                    .catch(function (error) {
                        if (typeof error.response != 'undefined')
                            reject(errorManager('manageOffer', error.response.data.extras.result_codes.operations[0]))
                        else
                            reject(error)
                        return
                    })
            })
            .catch((error) => {
                reject(errorManager('loadAccount', -1))
            })
    })
}

/**
 * Create Passive Offer function
 *  This is useful for offers just used as 1:1 exchanges for path payments. Use manage offer to manage this offer after using this operation to create it.
 * @param {string} privKey - The private key of the creator.      
 * @param {string} sellingCode -Asset code that you want to sell
 * @param {string} sellingIssuer - Issuer's publicKey of the Asset that you want to sell
 * @param {string} amount - The total amount youre selling. If 0, deletes the offer
 * @param {JSON} price - Price of 1 unit of selling in terms of buying.
 * @param {string} offerId - OfferID if 0 create new offer
 * @param {string} buyingCode - Asset code that you want to buy
 * @param {string} buyingIssuer - Issuer's publicKey of the Asset that you want to sell
 * @param {string} source - The source account (defaults to transaction source).
 * @return {JSON} result
 */
async function manageOffer(privKey, sellingCode, sellingIssuer, amount = '0', price = { 'd': 1, 'n': 1 }, offerId = '0', buyingCode = 'native', buyingIssuer = 'native', source = 'unsetted') {
    return new Promise((resolve, reject) => {
        let buying, selling, des
        try {
            if (buyingCode == "native" || buyingIssuer == "native")
                buying = new StellarSdk.Asset.native()
            else
                buying = new StellarSdk.Asset(buyingCode, buyingIssuer)

        } catch (error) {
            reject('StellarBurrito_ASSET_ERR Buying \n\r' + error)
        }
        try {
            if (sellingCode == "native" || sellingCode == "native")
                selling = new StellarSdk.Asset.native()
            else
                selling = new StellarSdk.Asset(sellingCode, sellingIssuer)
        } catch (error) {
            reject('StellarBurrito_ASSET_ERR Selling \n\r' + error)
        }
        try { des = StellarSdk.Keypair.fromSecret(privKey) }
        catch (err) {
            reject(errorManager('keyPair', -1))
            return
        }
        server.loadAccount(des.publicKey())
            .then(function (sourceAccount) {
                let builder = new StellarSdk.TransactionBuilder(sourceAccount)
                    .addOperation(StellarSdk.Operation.manageOffer({
                        selling,
                        buying,
                        amount,
                        price,
                        offerId
                    }))
                    .build()
                builder.sign(des)
                server.submitTransaction(builder)

                    .then(function (result) {
                        resolve(result)
                    })
                    .catch(function (error) {
                        if (typeof error.response != 'undefined')
                            reject(errorManager('manageOffer', error.response.data.extras.result_codes.operations[0]))
                        else
                            reject(err)
                        return
                    })
            })
            .catch((error) => {
                reject(errorManager('loadAccount', -1))
            })
    })
}

module.exports = {
    createPassiveOffer,
    manageOffer
}