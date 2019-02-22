let errorManager = require('./error')
let memoCreator = require('./memo')
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

async function createAccount(privKey, memoTypeCreate = 'text', memoCreate = 'default', startingBalance = '1.501', memoTypeTrust = 'text', memoTrust = 'default', issuer = 'unsetted', assetCode = 'unsetted', trustLimit = 'unsetted', timeout = 15) {
  return new Promise((resolve, reject) => {
    
    let memoFinalCreate =memoCreator(memoTypeCreate, memoCreate)
    if (memoFinalCreate.error) {
      reject(memoFinalCreate.memo)
      return
    }
    if (startingBalance < config.base_reserve) {
      reject(errorManager('createAccount', -3))
      return
    }
    memoFinalCreate = memoFinalCreate.memo
    let des
    try { des = StellarSdk.Keypair.fromSecret(privKey) }
    catch (err) {
      reject(errorManager('keyPair', -1))
      return
    }
    let newAccount = StellarSdk.Keypair.random()
    server.loadAccount(des.publicKey())
      .catch(StellarSdk.NotFoundError, function (error) {
        reject(errorManager('loadAccount', -1) + ' your private key')
        return
      })
      .then(function (sourceAccount) {
        let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
          .addOperation(StellarSdk.Operation.createAccount({
            destination: newAccount.publicKey(),
            startingBalance
          }))
          .addMemo(memoFinalCreate)
          .build()
        transaction.sign(des)
        return server.submitTransaction(transaction)
      })
      .then(function (result) {
        server.loadAccount(newAccount.publicKey())
          .catch(StellarSdk.NotFoundError, function (err) {
            reject(errorManager('createAccount', -5))
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
                if (typeof error.response != 'undefined')
                reject(errorManager('changeTrust', err.response.data.extras.result_codes.operations[0]))
              else
                reject(error)
              return
              })
          })
      })
      .catch(function (err) {
        if (typeof err.response != 'undefined')
        reject(errorManager('createAccount', err.response.data.extras.result_codes.operations[0]))
            else
        reject(err)
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

async function changeTrust(privKey, issuer, assetCode, trustLimit) {
  return new Promise((resolve, reject) => {
    
    let des = StellarSdk.Keypair.fromSecret(privKey)
    server.loadAccount(des.publicKey())
      .catch(StellarSdk.NotFoundError, function (error) {
        reject(errorManager('loadAccount', -1) + ' your private key')
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
          .build();
        transaction.sign(des);
        return server.submitTransaction(transaction)
      })
      .then(function (result) {
        resolve(result)
      })
      .catch(function (err) {
        if (typeof err.response != 'undefined')
          reject(errorManager('changeTrust', err.response.data.extras.result_codes.operations[0]))
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

async function mergeAccount(privKey, destination) {
  return new Promise((resolve, reject) => {
    let des = StellarSdk.Keypair.fromSecret(privKey)
    server.loadAccount(des.publicKey())
      .catch(StellarSdk.NotFoundError, function (error) {
        reject(errorManager('loadAccount', -1) + ' your private key')
        return
      })
      .then(function (sourceAccount) {
        let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
          .addOperation(StellarSdk.Operation.accountMerge({
            destination
          }))
          .build();
        transaction.sign(des);
        return server.submitTransaction(transaction)
      })
      .then(function (result) {
        resolve(result)
      })
      .catch(function (error) {
        if (typeof error.response != 'undefined')
          reject(errorManager('changeTrust', err.response.data.extras.result_codes.operations[0]))
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
        reject(errorManager('loadAccount', -1) + ' your private key')
        return
      })
      .then(function (sourceAccount) {
        let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
          .addOperation(StellarSdk.Operation.manageData({
            name,
            value
          }))
          .build();
        transaction.sign(des);
        return server.submitTransaction(transaction)
      })
      .then(function (result) {
        resolve(result)
      })
      .catch(function (error) {
        if (typeof error.response != 'undefined')
          reject(errorManager('changeTrust', err.response.data.extras.result_codes.operations[0]))
        else
          reject(error)
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