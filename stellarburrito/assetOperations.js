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
        let accountop = require('./accountOperations')
        let paymentop = require('./paymentOperations')

        async function createAsset(issuer, distributor, amount, assetCode, memoTypeTrust = 'text', memoTrust = 'default', memoTypePay = 'text', memoPay = 'default') {
            return new Promise((resolve, reject) => {
                var global = require('../global')
                var config = require('../config')
                let env = config.env
                global.init()
                    .then(function (global) {
                        let server, StellarSdk
                        if (typeof env != 'undefined' && env === "testnet") {
                            StellarSdk = Object.assign(Object.create(Object.getPrototypeOf(global.testnet.StellarSdk)), global.testnet.StellarSdk)
                        } else {
                            StellarSdk = Object.assign(Object.create(Object.getPrototypeOf(global.public.StellarSdk)), global.public.StellarSdk)
                        }
                        issuer = StellarSdk.Keypair.fromSecret(issuer)
                        distributor = StellarSdk.Keypair.fromSecret(distributor)
                        console.log("%s %s %s %s %s",distributor.secret(), issuer.publicKey(), assetCode, amount,distributor.publicKey())
                        accountop.changeTrust(distributor.secret(), issuer.publicKey(), assetCode, amount)
                            .then(function (res) {
                                paymentop.Pay(issuer.secret(), distributor.publicKey(), amount, assetCode, issuer.PublicKey())
                                .then(function (res) {
                                    resolve('asset created')
                                })
                                    .catch(function (res) {
                                        reject('payment error, check keys')
                                    })
                                   


                            })
                            .catch(function (err) {
                                reject('trust error probably you\'re trying to trust the same asset twice')
                            })
                    })
            })
        }
        module.exports = {
            createAsset
        }