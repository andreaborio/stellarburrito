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

async function setInlationDestination(privKey, inflationDest,timeout=15) {
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
    server.loadAccount(des.publicKey())
      .catch(StellarSdk.NotFoundError, function (error) {
        reject({
          message: 'The creator account for doesn\'t exists.',
          error
        });
      })
      .then(function (sourceAccount) {
        let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
          .addOperation(StellarSdk.Operation.setOptions({
            inflationDest
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
        reject('Tx error_' + error)
      })
  })
}

async function setHomeDomain(privKey, homeDomain,timeout=15) {
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
    server.loadAccount(des.publicKey())
      .catch(StellarSdk.NotFoundError, function (error) {
        reject({
          message: 'The creator account for doesn\'t exists.',
          error
        });
      })
      .then(function (sourceAccount) {
        let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
          .addOperation(StellarSdk.Operation.setOptions({
            homeDomain
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
        reject('Tx error_' + error)
      })
  })
}
async function setFlag(privKey, Flag,timeout=15) {
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
    server.loadAccount(des.publicKey())
      .catch(StellarSdk.NotFoundError, function (error) {
        reject({
          message: 'The creator account for doesn\'t exists.',
          error
        });
      })
      .then(function (sourceAccount) {
        if (Flag !== 1 && Flag !== 2 && Flag !== 4)
          reject({
            message: 'Allowed flag values ==> 1 , 2 , 4',
            error: 'Incorrect flag.'
          })
        let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
          .addOperation(StellarSdk.Operation.setOptions({
            setFlags: Flag
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
        reject('Tx error_' + error)
      })
  })
}
async function clearFlags(privKey, Flag,timeout) {
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
    server.loadAccount(des.publicKey())
      .catch(StellarSdk.NotFoundError, function (error) {
        reject({
          message: 'The creator account for doesn\'t exists.',
          error
        });
      })
      .then(function (sourceAccount) {
        if (Flag !== 1 && Flag !== 2 && Flag !== 4 && 1 === 3)
          reject({
            message: 'Error cleaning Flags',
            error: 'Incorrect flag.'
          })
        let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
          .addOperation(StellarSdk.Operation.setOptions({
            clearFlags: Flag
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
        reject('Tx error_' + error)
      })
  })
}

async function setSigner(privKey, signer, weight,timeout) {
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
    server.loadAccount(des.publicKey())
      .catch(StellarSdk.NotFoundError, function (error) {
        reject({
          message: 'The creator account for doesn\'t exists.',
          error
        });
      })
      .then(function (sourceAccount) {
        let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
          .addOperation(StellarSdk.Operation.setOptions({
            signer: {
            }
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
        reject('Tx error_' + error)
      })
  })
}
async function setLowThreshold(privKey, lowThreshold, weight,timeout=15) {
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
    server.loadAccount(des.publicKey())
      .catch(StellarSdk.NotFoundError, function (error) {
        reject({
          message: 'The creator account for doesn\'t exists.',
          error
        });
      })
      .then(function (sourceAccount) {
        let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
          .addOperation(StellarSdk.Operation.setOptions({
            lowThreshold
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
        reject('Tx error_' + error)
      })
  })
}
async function setMediumThreshold(privKey, medThreshold, weight,timeout=15) {
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
    server.loadAccount(des.publicKey())
      .catch(StellarSdk.NotFoundError, function (error) {
        reject({
          message: 'The creator account for doesn\'t exists.',
          error
        });
      })
      .then(function (sourceAccount) {
        let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
          .addOperation(StellarSdk.Operation.setOptions({
            medThreshold
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
        reject('Tx error_' + error)
      })
  })
}
async function setHighThreshold(privKey, highThreshold, weight,timeout=15) {
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
    server.loadAccount(des.publicKey())
      .catch(StellarSdk.NotFoundError, function (error) {
        reject({
          message: 'The creator account for doesn\'t exists.',
          error
        });
      })
      .then(function (sourceAccount) {
        let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
          .addOperation(StellarSdk.Operation.setOptions({
            highThreshold
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
        reject('Tx error_' + error)
      })
  })
}
async function setMasterWeight(privKey, masterWeight,timeout=15) {
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
    server.loadAccount(des.publicKey())
      .catch(StellarSdk.NotFoundError, function (error) {
        reject({
          message: 'The creator account for doesn\'t exists.',
          error
        });
      })
      .then(function (sourceAccount) {
        let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
          .addOperation(StellarSdk.Operation.setOptions({
            masterWeight
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
        reject('Tx error_' + error)
      })
  })
}
async function bumpSequence(privKey, bumpTo,timeout=15) {
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
    server.loadAccount(des.publicKey())
      .catch(StellarSdk.NotFoundError, function (error) {
        reject({
          message: 'The creator account for doesn\'t exists.',
          error
        });
      })
      .then(function (sourceAccount) {
        let transaction = new StellarSdk.TransactionBuilder(sourceAccount)
          .addOperation(StellarSdk.Operation.setOptions({
            bumpTo
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
        reject('Tx error_' + error)
      })
  })
}
module.exports = {
  setInlationDestination,
  setHomeDomain,
  setFlag,
  clearFlags,
  setLowThreshold,
  setMediumThreshold,
  setHighThreshold,
  setMasterWeight,
  bumpSequence
}