/* eslint-disable no-unused-vars */
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
 */

async function setInlationDestination(privKey, memoTypeCreate = 'text', memoCreate = 'default', startingBalance = '1.501', memoTypeTrust = 'text', memoTrust = 'default', issuer = 'unsetted', assetCode = 'unsetted', trustLimit = 'unsetted') {
    return new Promise((resolve, reject) => {
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
      let des = StellarSdk.Keypair.fromSecret(privKey)
      let newAccount = StellarSdk.Keypair.random()
      server.loadAccount(des.publicKey())
        .catch(StellarSdk.NotFoundError, function (error) {
          reject({
            message: 'The creator account for doesn\'t exists.',
            error
          });
        })
        .then(function (sourceAccount) {
          let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
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
         
                  resolve(result)
                    
            })
            .catch(function (error) {
              reject('Tx error_' + error)
            })
  
  
        })
    }
  

  module.exports = {
    createAccount,
    changeTrust,
    mergeAccount,
    manageData
  }