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
async function Pay(sender, receiver, amount, assetCode = 'native', issuer = 'native', memoType = 'text', memo = 'def') {
    return new Promise((resolve, reject) => {
        var global = require('../settings/global')
        let config = require('../settings/config')
        let env = config.env
        global.init()
            .then(function (global) {
                let server, StellarSdk
                if (typeof env != 'undefined' && env === "testnet") {
                    server = Object.assign(Object.create(Object.getPrototypeOf(global.test.server)), global.test.server)
                    StellarSdk = Object.assign(Object.create(Object.getPrototypeOf(global.test.StellarSdk)), global.test.StellarSdk)
                } else {
                    server = Object.assign(Object.create(Object.getPrototypeOf(global.pub.server)), global.pub.server)
                    StellarSdk = Object.assign(Object.create(Object.getPrototypeOf(global.pub.StellarSdk)), global.pub.StellarSdk)
                }
                let memoFinal, asset;
                switch (memoType) {
                    case 'text':
                        memoFinal = StellarSdk.Memo.text(memo)
                        break;
                    case 'id':
                        memoFinal = StellarSdk.Memo.id(memo)
                        break;
                    case 'return':
                        memoFinal = StellarSdk.Memo.return(memo)
                        break;
                    default:
                        reject('StellarBurrito_FORMAT_ERR Invalid memo type')
                        break;
                }
                if (issuer == "native" && assetCode == "native")
                    asset = new StellarSdk.Asset.native()
                else
                    asset = new StellarSdk.Asset(assetCode, issuer)
                let des = StellarSdk.Keypair.fromSecret(sender)
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
                        builder.addMemo(memoFinal)
                        let transaction = builder.build()
                        transaction.sign(des)
                        server.submitTransaction(transaction)
                            .then(function (result) {
                                resolve(result)
                            })
                            .catch(function (error) {
                                reject('StellarBurrito_TX_ERR ' + error)
                            })
                    })
                    .catch(StellarSdk.NotFoundError, function (error) {
                        reject('StellarBurrito_KEY_ERR The sender account for payment_op doesn\'t exists.')
                    })
            })
    })
}

module.exports = {
    Pay
}