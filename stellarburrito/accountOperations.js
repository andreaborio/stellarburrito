/**
 * @author Andrea Borio andrea.borio(at)outlook.com
 * 
 * Create new account function
 * privKey, memoTypeCreate, memoCreate are mandatory
 * Add a trustline on the new account overloading this function
 *
 * @param {string} privKey - The private key of the creator account.
 * @param {string} memoTypeCreate - The type of memo the create transaction that you want create (text,id,return)
 * @param {string} memoCreate - The content of memo the create transaction that you want create 
 * @param {string} memoTypeTrust - The type of memo the transaction that you want create (text,id,return)
 * @param {string} startingBalance - The strarting balance of created account
 * @param {string} memoTrust - The content of memo the change trust transaction that you want create (text,id,return)
 * @param {string} issuer - The public key of the issuer 
 * @param {string} assetCode - The assetCode of the asset that you want to trust
 * @param {string} trustLimit - The amount of coin that you want to trust from this issuer
 * 
 * 
 */

async function createAccount(privKey, memoTypeCreate, memoCreate, startingBalance, memoTypeTrust, memoTrust, issuer, assetCode, trustLimit) {
    return new Promise((resolve, reject) => {
          var global = require('../global')
          global.init()
            .then(function (global) {
              let server, StellarSdk
              var config = require('../config')
              let env = config.env
              if (typeof env != 'undefined' && env === "testnet") {
                server = Object.assign(Object.create(Object.getPrototypeOf(global.testnet.server)), global.testnet.server)
                StellarSdk = Object.assign(Object.create(Object.getPrototypeOf(global.testnet.StellarSdk)), global.testnet.StellarSdk)
              } else {
                server = Object.assign(Object.create(Object.getPrototypeOf(global.public.server)), global.public.server)
                StellarSdk = Object.assign(Object.create(Object.getPrototypeOf(global.public.StellarSdk)), global.public.StellarSdk)
              }
              var memoFinalCreate
              switch (memoTypeCreate) {
                case 'text':
                  memoFinalCreate = StellarSdk.Memo.text(memoCreate)
                  break;
                case 'id':
                  memoFinalCreate = StellarSdk.Memo.id(memoCreate)
                  break;
                case 'return':
                  memoFinalCreate = StellarSdk.Memo.return(memoCreate)
                  break;
                default:
                  reject('invalid memo type')
                  break;
              }
              let des = StellarSdk.Keypair.fromSecret(privKey)
              let newAccount = StellarSdk.Keypair.random()
              server.loadAccount(des.publicKey())
                .catch(StellarSdk.NotFoundError, function (error) {
                  reject({
                    message: 'The creator account for doesn\'t exists.',
                    errCode: 404
                  });
                })
                .then(function (sourceAccount) {
                  transaction = new StellarSdk.TransactionBuilder(sourceAccount)
                    .addOperation(StellarSdk.Operation.createAccount({
                      destination: newAccount.publicKey(), //chiave pubblica appena generata  più in alto con il metodo keypar.random()
                      startingBalance // base reserve 2 + 1 per effettuare circa 100k operazioni
                    }))
                    .addMemo(memoFinalCreate)
                    .build();
                  transaction.sign(des);
                  return server.submitTransaction(transaction)
                })
                .then(function (result) {
                  server.loadAccount(newAccount.publicKey())
                    .catch(StellarSdk.NotFoundError, function (error) {
                      reject({
                        message: 'The creator account for doesn\'t exists.',
                        errCode: 404
                      });
                    })
                    .then(function (sourceAccount) {
                      if (typeof memoTypeTrust == "undefined") {
                        resolve({
                          "publicKey": newAccount.publicKey(),
                          "privateKey": newAccount.secret()
                        })
                      }
                      changeTrust(newAccount.secret(), issuer, assetCode,trustLimit, memoTypeTrust, memoTrust)
                        .then(function (result) {
                          resolve({
                            "publicKey": newAccount.publicKey(),
                            "privateKey": newAccount.secret()
                          })
                        })
                        .catch(function (error) {
                          reject('Tx error_' + error)
                        })
                    })
                    .catch(function (error) {
                      reject('Tx error_' + error)
                    })


                })
            })
          })
        }
        /**
         * changeTrust function
         *
         * 
         * @param {string} privKey - The private key of the account.
         * @param {string} memoType - The type of memo the transaction that you want create (text,id,return)
         * @param {string} memo - The content of memo the change trust transaction that you want create (text,id,return)
         * @param {string} issuer - The public key of the issuer 
         * @param {string} assetCode - The assetCode of the asset that you want to trust
         * @param {string} trustLimit - The amount of coin that you want to trust from this issuer
         * 
         * 
         */

        async function changeTrust(privKey, issuer, assetCode, trustLimit, memoType, memo) {
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
                var memoFinal;
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
                let des = StellarSdk.Keypair.fromSecret(privKey)
                server.loadAccount(des.publicKey())
                  .catch(StellarSdk.NotFoundError, function (error) {
                    reject({
                      message: 'The destination account for change_trust_op doesn\'t exists.',
                      errCode: 404
                    });
                  })
                  .then(function (sourceAccount) {
                    let asset = new StellarSdk.Asset(assetCode, issuer)
                    transaction = new StellarSdk.TransactionBuilder(sourceAccount)
                      .addOperation(StellarSdk.Operation.changeTrust({
                        asset: asset,
                        limit: trustLimit
                      }))
                      .addMemo(memoFinal)
                      .build();
                    transaction.sign(des);
                    return server.submitTransaction(transaction)
                  })
                  .then(function (result) {
                    resolve(result)
                  })
                  .catch(function (error) {
                    reject('Tx error_' + error)
                  })


              })
          })
        }
        //TODO MergeAccount, createMultipleAccount,Trust Multiple asset
        module.exports = {
          createAccount,
          changeTrust
        }