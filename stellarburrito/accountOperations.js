let error = require('./error')
let memoc = require('./memo')
let StellarSdk = require('stellar-sdk')
    let config = require('./config')
    let server
    let env = config.env
    if (typeof env != 'undefined' && env === "testnet") {
      server = new StellarSdk.Server(config.testnet_horizon)
      StellarSdk.Network.useTestNetwork()
    } else {
      server = new StellarSdk.Server(config.pubnet_horizon)
      StellarSdk.Network.usePublicNetwork()
    }
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

async function createAccount(privKey, memoTypeCreate = 'text', memoCreate = 'default', startingBalance = '1.501', timeout = 15, memoTypeTrust = 'text', memoTrust = 'default', issuer = 'unsetted', assetCode = 'unsetted', trustLimit = 'unsetted') {
  return new Promise((resolve, reject) => {
    
    let memoFinalCreate = memoc.memoCreator(memoTypeCreate, memoCreate)
    if (memoFinalCreate.error) {
      reject(memoFinalCreate.memo)
      return
    }
    if (startingBalance < config.base_reserve) {
      reject(error.errorManager('createAccount', -3))
      return
    }
    memoFinalCreate = memoFinalCreate.memo
    let des
    try { des = StellarSdk.Keypair.fromSecret(privKey) }
    catch (err) {
      reject(error.errorManager('keyPair', -1))
      return
    }
    let newAccount = StellarSdk.Keypair.random()
    server.loadAccount(des.publicKey())
      .catch(StellarSdk.NotFoundError, function (error) {
        reject(error.errorManager('loadAccount', -1) + ' your private key')
        return
      })
      .then(function (sourceAccount) {
        let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
          .addOperation(StellarSdk.Operation.createAccount({
            destination: newAccount.publicKey(),
            startingBalance
          }))
          .addMemo(memoFinalCreate)
          .setTimeout(timeout)
          .build();
        transaction.sign(des);
        return server.submitTransaction(transaction)
      })
      .then(function (result) {
        server.loadAccount(newAccount.publicKey())
          .catch(StellarSdk.NotFoundError, function (err) {
            reject(error.errorManager('createAccount', -5))
            return
          })
          .then(function (sourceAccount) {
            if (assetCode === 'unsetted') {
              resolve({
                "publicKey": newAccount.publicKey(),
                "privateKey": newAccount.secret()
              })
            }
            changeTrust(newAccount.secret(), issuer, assetCode, trustLimit, memoTypeTrust, memoTrust)
              .then(function (result) {
                resolve({
                  "publicKey": newAccount.publicKey(),
                  "privateKey": newAccount.secret()
                })
              })
              .catch(function (error) {
                reject('Tx error_' + error)
                return
              })
          })
      })
      .catch(function (err) {
        console.log
        reject(error.errorManager('createAccount', err.response.data.extras.result_codes.operations[0]))
        return
      })
  })
}
/**
 * changeTrust function
 *
 * 
 * @param {string} privKey - The private key of the account.
 * @param {string} memoType - The type of memo of the transaction that you want create (text,id,return)
 * @param {string} memo - The content of memo of the change trust transaction that you want create (text,id,return)
 * @param {string} issuer - The public key of the issuer 
 * @param {string} assetCode - The assetCode of the asset that you want to trust
 * @param {string} trustLimit - The amount of coin that you want to trust from this issuer
 * 
 * 
 */

async function changeTrust(privKey, issuer, assetCode, trustLimit, timeout = 15) {
  return new Promise((resolve, reject) => {
    
    let des = StellarSdk.Keypair.fromSecret(privKey)
    server.loadAccount(des.publicKey())
      .catch(StellarSdk.NotFoundError, function (error) {
        reject(error.errorManager('loadAccount', -1) + ' your private key')
        return
      })
      .then(function (sourceAccount) {
        let asset
        try { asset = new StellarSdk.Asset(assetCode, issuer) } catch (err) {
          reject(err)
          return
        }
        let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
          .addOperation(StellarSdk.Operation.changeTrust({
            asset,
            limit: trustLimit
          }))
          .setTimeout(timeout)
          .build();
        transaction.sign(des);
        return server.submitTransaction(transaction)
      })
      .then(function (result) {
        resolve(result)
      })
      .catch(function (err) {
        if (typeof err.response != 'undefined')
          reject(error.errorManager('changeTrust', err.response.data.extras.result_codes.operations[0]))
        else
          reject(err)
        return
      })


  })
}
/**
 * mergeAccount function
 *
 * 
 * @param {string} privKey - The private key of the account to merge into the destination.
 * @param {string} destintation - The destination for merge account
 * 
 * 
 */

async function mergeAccount(privKey, destination, timeout = 15) {
  return new Promise((resolve, reject) => {
   
    let des = StellarSdk.Keypair.fromSecret(privKey)
    server.loadAccount(des.publicKey())
      .catch(StellarSdk.NotFoundError, function (error) {
        reject(error.errorManager('loadAccount', -1) + ' your private key')
        return
      })
      .then(function (sourceAccount) {
        let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
          .addOperation(StellarSdk.Operation.accountMerge({
            destination
          }))
          .setTimeout(timeout)
          .build();
        transaction.sign(des);
        return server.submitTransaction(transaction)
      })
      .then(function (result) {
        resolve(result)
      })
      .catch(function (error) {
        if (typeof err.response != 'undefined')
          reject(error.errorManager('changeTrust', err.response.data.extras.result_codes.operations[0]))
        else
          reject(err)
        return
      })


  })
}
/**
 * manageData function
 *
 * 
 * @param {string} privKey - The private key of the account to merge into the destination.
 * @param {string} name - Name of data <64Bytes || 64 Char in UTF8
 * @param {string} value - Value of data <64 Bytes || 64 Char in UTF8
 * 
 * 
 */
async function manageData(privKey, name, value, timeout = 15) {
  return new Promise((resolve, reject) => {
    let des = StellarSdk.Keypair.fromSecret(privKey)
    server.loadAccount(des.publicKey())
      .catch(StellarSdk.NotFoundError, function (error) {
        reject(error.errorManager('loadAccount', -1) + ' your private key')
        return
      })
      .then(function (sourceAccount) {
        let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
          .addOperation(StellarSdk.Operation.manageData({
            name,
            value
          }))
          .setTimeout(timeout)
          .build();
        transaction.sign(des);
        return server.submitTransaction(transaction)
      })
      .then(function (result) {
        resolve(result)
      })
      .catch(function (error) {
        if (typeof err.response != 'undefined')
          reject(error.errorManager('changeTrust', err.response.data.extras.result_codes.operations[0]))
        else
          reject(err)
      })


  })
}



//TODO MergeAccount, createMultipleAccount,Trust Multiple asset
module.exports = {
  createAccount,
  changeTrust,
  mergeAccount,
  manageData
}