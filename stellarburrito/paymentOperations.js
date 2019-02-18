let config = require('./config')
let server
let errorManager = require('./error')
let memoCreator = require('./memo')
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
 * payment function
 * Sender pays receiver an amount of coin.
 * you can specify more than one receiver and use custom asset and custom memo
 * @param {string} sender - The private key of the sender.      
 * @param {string} receiver - The public key of the receiver
 * @param {string} amount - The amount of coins that sender pays to receiver 
 * @param {string} assetCode - The assetCode of the asset that you want to trust
 * @param {string} issuer - The amount of coin that you want to trust from this issuer
 * @param {string} memoType - The type of memo of the transaction that you want create (text,id,return)
 * @param {string} memo - The content of memo of the change trust transaction that you want create (text,id,return)
 */
async function Pay(sender, receiver, amount, assetCode = 'native', issuer = 'native', timeout = 15, memoType = 'text', memo = 'def') {
    return new Promise((resolve, reject) => {
        let memoFinal, asset;
        memoFinal = memoCreator(memoType, memo)
        if (memoFinal.error) {
            reject(memoFinal.memo)
            return
        }
        memoFinal = memoFinal.memo
        let des
        try { des = StellarSdk.Keypair.fromSecret(sender) }
        catch (err) {
            reject(errorManager('keyPair', -1))
            return
        }
        if (issuer == "native" && assetCode == "native")
            asset = new StellarSdk.Asset.native()
        else
            try { asset = new StellarSdk.Asset(assetCode, issuer) }
            catch (err) {
                reject(err)
                return
            }
        server.loadAccount(des.publicKey())
            .then(function (sourceAccount) {
                let builder = new StellarSdk.TransactionBuilder(sourceAccount)
                if (typeof receiver == "string")
                    builder.addOperation(StellarSdk.Operation.payment({
                        destination: receiver,
                        asset,
                        amount
                    }))
                else {
                    for (var w = 0; w < receiver.length; w++) {
                        builder.addOperation(StellarSdk.Operation.payment({
                            destination: receiver[w],
                            asset,
                            amount
                        }))
                    }
                }
                builder.setTimeout(timeout)
                builder.addMemo(memoFinal)
                let transaction = builder.build()
                transaction.sign(des)
                server.submitTransaction(transaction)
                    .then(function (result) {
                        resolve(result)
                    })
                    .catch(function (error) {
                        if (typeof error.response != 'undefined')
                            reject(errorManager('payment', error.response.data.extras.result_codes.operations[0]))
                        else
                            reject(err)
                        return
                    })
            })
            .catch((error) => {
                console.log(error)
                reject(errorManager('loadAccount', -1))
            })
    })
}
module.exports = Pay 