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

async function createAccount(privKey, memoTypeCreate = 'text', memoCreate = 'default', startingBalance = '1.501', memoTypeTrust = 'text', memoTrust = 'default', issuer = 'unsetted', assetCode = 'unsetted', trustLimit = 'unsetted') {
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
    let memoFinalCreate
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
              })
          })
          .catch(function (error) {
            reject('Tx error_' + error)
          })


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

async function changeTrust(privKey, issuer, assetCode, trustLimit, memoType = 'text', memo = 'default') {
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
        reject('StellarBurrito_FORMAT_ERR Invalid memo type')
        break;
    }
    let des = StellarSdk.Keypair.fromSecret(privKey)
    server.loadAccount(des.publicKey())
      .catch(StellarSdk.NotFoundError, function (error) {
        reject('StellarBurrito_KEY_ERR The destination account for change_trust_op doesn\'t exists.', );
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
        reject('StellarBurrito_TX_ERR' + error)
      })


  })
}

//TODO MergeAccount, createMultipleAccount,Trust Multiple asset
module.exports = {
  createAccount,
  changeTrust
}