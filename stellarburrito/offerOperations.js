/**
 * Create Passive Offer function
 *  This is useful for offers just used as 1:1 exchanges for path payments. Use manage offer to manage this offer after using this operation to create it.
 * @param {string} privKey - The private key of the creator.      
 * @param {string} sellingCode -Asset code that you want to sell
 * @param {string} sellingIssuer - Issuer's publicKey of the Asset that you want to sell
 * @param {string} buyingCode - Asset code that you want to buy
 * @param {string} buyingIssuer - Issuer's publicKey of the Asset that you want to sell
 * @param {string} amount - The total amount youre selling. If 0, deletes the offer
 * @param {string} price - Price of 1 unit of selling in terms of buying.
 * @param {string} source - The source account (defaults to transaction source).
 */
async function createPassiveOffer(privKey, sellingCode = 'native', sellingIssuer = 'native', amount = '0', price = 1, buyingCode = 'native', buyingIssuer = 'native', source = 'unsetted') {
    return new Promise((resolve, reject) => {
        let config = require('./config')
        let server
        let env = config.env
        let buying, selling
        let StellarSdk = require('stellar-sdk')
        if (typeof env != 'undefined' && env === "testnet") {
            StellarSdk.Network.useTestNetwork()
            server = new StellarSdk.Server(config.testnet_horizon)
        } else {
            StellarSdk.Network.usePublicNetwork()
            server = new StellarSdk.Server(config.pubnet_horizon)
        }
        /*  try {*/
        if (buyingCode == "native" || buyingIssuer == "native")
            buying = new StellarSdk.Asset.native()
        else
            buying = new StellarSdk.Asset(buyingCode, buyingIssuer)
            
        if (sellingCode == "native" || sellingIssuer == "native")
            selling = new StellarSdk.Asset.native()
        else
            selling = new StellarSdk.Asset(sellingCode, sellingIssuer)

        /* }/* catch (error) {
             reject('StellarBurrito_ASSET_ERR \n\r' + error)
         }*/
        let des = StellarSdk.Keypair.fromSecret(privKey)
        console.log('ok')
        server.loadAccount(des.publicKey())
            .then(function (sourceAccount) {
                let builder = new StellarSdk.TransactionBuilder(sourceAccount)
                    .addOperation(StellarSdk.Operation.createPassiveOffer({
                        selling,
                        buying,
                        amount,
                        price
                    }))
                    .addMemo(StellarSdk.Memo.text('default'))
                    .build()
                builder.sign(des)
                server.submitTransaction(builder)

                    .then(function (result) {
                        resolve(result)
                    })
                    .catch(function (error) {
                        console.log(error)
                        reject('StellarBurrito_TX_ERR ' + error)
                    })
            })
    })
}

/**
 * Create Passive Offer function
 *  This is useful for offers just used as 1:1 exchanges for path payments. Use manage offer to manage this offer after using this operation to create it.
 * @param {string} privKey - The private key of the creator.      
 * @param {string} sellingCode -Asset code that you want to sell
 * @param {string} sellingIssuer - Issuer's publicKey of the Asset that you want to sell
 * @param {string} buyingCode - Asset code that you want to buy
 * @param {string} buyingIssuer - Issuer's publicKey of the Asset that you want to sell
 * @param {string} amount - The total amount youre selling. If 0, deletes the offer
 * @param {string} price - Price of 1 unit of selling in terms of buying.
 * @param {string} source - The source account (defaults to transaction source).
 */
async function manageOffer(privKey, sellingCode, sellingIssuer, amount = '0', price = '1', offerId = '0', buyingCode = 'native', buyingIssuer = 'native', source = 'unsetted') {
    return new Promise((resolve, reject) => {
        let config = require('./config')
        let server
        let env = config.env
        let buying, selling
        let StellarSdk = require('stellar-sdk')
        if (typeof env != 'undefined' && env === "testnet") {
            StellarSdk.Network.useTestNetwork()
            server = new StellarSdk.Server(config.testnet_horizon)
        } else {
            StellarSdk.Network.usePublicNetwork()
            server = new StellarSdk.Server(config.pubnet_horizon)
        }
        try {
            if (buyingCode == "native" && buyingIssuer == "native")
                buying = new StellarSdk.Asset.native()
            else
                buying = new StellarSdk.Asset(buyingCode, buyingIssuer)
            selling = new StellarSdk.Asset(sellingCode, sellingIssuer)
        } catch (error) {
            reject('StellarBurrito_ASSET_ERR \n\r' + error)
        }
        let des = StellarSdk.Keypair.fromSecret(privKey)
        console.log('ok')
        server.loadAccount(des.publicKey())
            .then(function (sourceAccount) {
                console.log(des.publicKey() + ' ' + privKey)
                let builder = new StellarSdk.TransactionBuilder(sourceAccount)
                    .addOperation(StellarSdk.Operation.manageOffer({
                        selling,
                        buying,
                        amount,
                        price,
                        offerId
                    }))
                    .addMemo(StellarSdk.Memo.text('default'))
                    .build()
                builder.sign(des)
                server.submitTransaction(builder)

                    .then(function (result) {
                        resolve(result)
                    })
                    .catch(function (error) {
                        console.log(error)
                        reject('StellarBurrito_TX_ERR ' + error)
                    })
            })
    })
}

module.exports = {
    createPassiveOffer,
    manageOffer
}