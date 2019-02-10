/* eslint-disable no-unused-vars */
/**
 * @author Andrea Borio andrea.borio(at)outlook.com
 * 
 * Set Account options
 * 
 *
 * @param {string} privKey - The private key of the creator account.
 * @param {JSON} payload - The json with options
 * @param {number} timeout - Timeout in seconds
 */
async function setOptions(privKey, payload, timeout = 15) {
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
          .addOperation(StellarSdk.Operation.setOptions(payload))
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
/**
* Set Inflation Destination
* set inflation destination for the given account
*
* @param {string} privKey - The private key of the account.
* @param {string} inflationDest - The public key of inflation destination
* @param {number} timeout - Timeout in seconds
*/
async function setInlationDestination(privKey, inflationDest, timeout = 15) {
  return new Promise((resolve, reject) => {
    setOptions(privKey, { inflationDest }, timeout)
      .then(function (result) {
        resolve(result)
      })
      .catch(function (error) {
        reject('Tx error_' + error)
      })
  })
}
/**
* Set Home domain
* set home domain for the given account
*
* @param {string} privKey - The private key of the account.
* @param {string} homeDomain - The homedomain that you want to set
* @param {number} timeout - Timeout in seconds
*/
async function setHomeDomain(privKey, homeDomain, timeout = 15) {
  return new Promise((resolve, reject) => {
    setOptions(privKey, { homeDomain }, timeout)
      .then(function (result) {
        resolve(result)
      })
      .catch(function (error) {
        reject('Tx error_' + error)
      })
  })
}
/**
* Set Flag
* set Flag for the given account
*
* @param {string} privKey - The private key of the account.
* @param {string} Flag -1 for Authorization required 2 for Authorization revocable 4 forAuthorization immutable 
* @param {number} timeout - Timeout in seconds
*/
async function setFlag(privKey, Flag, timeout = 15) {
  return new Promise((resolve, reject) => {
    if (Flag != 1 && Flag != 2 && Flag != 4)
      reject({
        message: 'Allowed flag values ==> 1 , 2 , 4',
        error: 'Incorrect flag.'
      })
    setOptions(privKey, { setFlags: Flag }, timeout)
      .then(function (result) {
        resolve(result)
      })
      .catch(function (error) {
        reject('Tx error_' + error)
      })
  })
}
/**
* Clear Flag
* Clear a specific flag for the given account
*
* @param {string} privKey - The private key of the account.
* @param {string} Flag -1 for Authorization required 2 for Authorization revocable 4 forAuthorization immutable 
* @param {number} timeout - Timeout in seconds
*/
async function clearFlag(privKey, Flag, timeout) {
  return new Promise((resolve, reject) => {
    if (Flag != 1 && Flag != 2 && Flag != 4)
      reject({
        message: 'Allowed flag values ==> 1 , 2 , 4',
        error: 'Incorrect flag.'
      })
    setOptions(privKey, { clearFlags: Flag }, timeout)
      .then(function (result) {
        resolve(result)
      })
      .catch(function (error) {
        reject('Tx error_' + error)
      })
  })
}
/**
* Set Signer
* Set a new signer for the given account
*
* @param {string} privKey - The private key of the account.
* @param {string} signerPubKey - The public key of the new signer 
* @param {number} weight - weight for the signer 0-255
* @param {number} timeout - Timeout in seconds
*/
async function setSigner(privKey, signerPubKey, weight, timeout) {
  return new Promise((resolve, reject) => {
    let payload = {
      ed25519PublicKey: signerPubKey,
      weight
    }
    setOptions(privKey, payload, timeout)
      .then(function (result) {
        resolve(result)
      })
      .catch(function (error) {
        reject('Tx error_' + error)
      })
  })
}
/**
* Set lowthreshold
* Set lowthreshold for the given account
*
* @param {string} privKey - The private key of the account.
* @param {number} lowThreshold - The value of Threshold 0-255
* @param {number} timeout - Timeout in seconds
*/
async function setLowThreshold(privKey, lowThreshold, timeout = 15) {
  return new Promise((resolve, reject) => {
    setOptions(privKey, { lowThreshold }, timeout)
      .then(function (result) {
        resolve(result)
      })
      .catch(function (error) {
        reject('Tx error_' + error)
      })
  })
}
/**
* Set mediumthreshold
* Set mediumthreshold for the given account
*
* @param {string} privKey - The private key of the account.
* @param {number} medThreshold - The value of Threshold 0-255
* @param {number} timeout - Timeout in seconds
*/
async function setMediumThreshold(privKey, medThreshold, timeout = 15) {
  return new Promise((resolve, reject) => {
    setOptions(privKey, { medThreshold }, timeout)
      .then(function (result) {
        resolve(result)
      })
      .catch(function (error) {
        reject('Tx error_' + error)
      })
  })
}
/**
* Set highThreshold
* Set highthreshold for the given account
*
* @param {string} privKey - The private key of the account.
* @param {number} highThreshold - The value of Threshold 0-255
* @param {number} timeout - Timeout in seconds
*/
async function setHighThreshold(privKey, highThreshold, timeout = 15) {
  return new Promise((resolve, reject) => {
    setOptions(privKey, { highThreshold }, timeout)
      .then(function (result) {
        resolve(result)
      })
      .catch(function (error) {
        reject('Tx error_' + error)
      })
  })
}
/**
* Set master weight
* Set Master key weight for the given account
* @param {string} privKey - The private key of the account.
* @param {number} masterWeight - The weight of master key 0-255
* @param {number} timeout - Timeout in seconds
*/
async function setMasterWeight(privKey, masterWeight, timeout = 15) {
  return new Promise((resolve, reject) => {
    setOptions(privKey, { masterWeight }, timeout)
      .then(function (result) {
        resolve(result)
      })
      .catch(function (error) {
        reject('Tx error_' + error)
      })
  })
}
/**
* bump sequenge
* Bump sequence of the given account
* @param {string} privKey - The private key of the account.
* @param {number} bumpTo - The sequence number from 0-9223372036854775807
* @param {number} timeout - Timeout in seconds
*/
async function bumpSequence(privKey, bumpTo, timeout = 15) {
  return new Promise((resolve, reject) => {
    setOptions(privKey, { bumpTo }, timeout)
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
  clearFlag,
  setLowThreshold,
  setMediumThreshold,
  setHighThreshold,
  setMasterWeight,
  bumpSequence,
  setSigner,
  setOptions
}