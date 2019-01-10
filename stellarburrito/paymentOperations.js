        /**
         * payment function
         * Sender pays receiver an amount of coin.
         * you can specify more than one receiver and use custom asset and custom memo
         * @param {string} sender - The private key of the sender.      
         * @param {string} receiver - The public key of the receiver
         * @param {string} amount - The amount of coins that sender pays to receiver 
         * @param {string} assetCode - The assetCode of the asset that you want to trust
         * @param {string} issuer - The amount of coin that you want to trust from this issuer
         * @param {string} memoType - The type of memo the transaction that you want create (text,id,return)
         * @param {string} memo - The content of memo the change trust transaction that you want create (text,id,return)
         * 
         * 
         */

        async function Pay(sender, receiver, amount, assetCode = 'native', issuer = 'native', memoType = 'text', memo = 'def') {
            return new Promise((resolve, reject) => {
                var global = require('../global')
                var config = require('../config')
                let env = config.env
                global.init()
                    .then(function (global) {
                        let server, StellarSdk
                        if (typeof env != 'undefined' && env === "testnet") {
                            server = Object.assign(Object.create(Object.getPrototypeOf(global.testnet.server)), global.testnet.server)
                            StellarSdk = Object.assign(Object.create(Object.getPrototypeOf(global.testnet.StellarSdk)), global.testnet.StellarSdk)
                        } else {
                            server = Object.assign(Object.create(Object.getPrototypeOf(global.public.server)), global.public.server)
                            StellarSdk = Object.assign(Object.create(Object.getPrototypeOf(global.public.StellarSdk)), global.public.StellarSdk)
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
                                reject('invalid memo type')
                                break;
                        }
                        let asset
                        if (issuer == "native" && assetCode == "native")
                            asset = new StellarSdk.Asset.native()
                        else
                            asset = new StellarSdk.Asset(assetCode, issuer)


                        let des = StellarSdk.Keypair.fromSecret(sender)
                        server.loadAccount(des.publicKey())
                            .catch(StellarSdk.NotFoundError, function (error) {
                                reject({
                                    message: 'The sender account for payment doesn\'t exists.',
                                    errCode: 404
                                });
                            })
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
                                return server.submitTransaction(transaction)
                            })
                            .catch(function (error) {
                                reject('Tx error_' + error)
                            })
                            .then(function (result) {
                                console.log(result)
                                resolve(result)
                            })



                    })
            })
        }
        module.exports = {
            Pay
        }