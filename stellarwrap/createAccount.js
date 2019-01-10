

/**
 * Create new account function
 * privKey, memoTypeCreate, memoCreate are mandatory
 * Add a trustline on the new account overloading this function
 * @constructor
 * @param {string} privKey - The private key of the creator account.
 * @param {string} memoTypeCreate - The type of memo the create transaction that you want create (text,id,return)
 * @param {string} memoCreate - The content of memo the create transaction that you want create 
 * @param {string} memoTypeTrust - The type of memo the transaction that you want create (text,id,return)
 * @param {string} memoTrust - The content of memo the change trust transaction that you want create (text,id,return)
 * @param {string} issuer - The public key of the issuer 
 * @param {string} assetCode - The assetCode of the asset that you want to trust
 * @param {string} trustLimit - The amount of coin that you want to trust from this issuer
 * @author Andrea Borio andrea.borio@outlook.com
 * 
 */

async function createAccount(privKey, memoTypeCreate, memoCreate,startingBalance,memoTypeTrust, memoTrust, issuer, assetCode, trustLimit) {
    return new Promise((resolve, reject) => {
      var global = require('../global')
      global.init()
        .then(function (global) {
          let server,StellarSdk
          var config=require('../config')
          let env=config.env
          if (typeof env != 'undefined' && env === "testnet") {
            server = Object.assign( Object.create( Object.getPrototypeOf(global.testnet.server)), global.testnet.server)
            StellarSdk = Object.assign( Object.create( Object.getPrototypeOf(global.testnet.StellarSdk)), global.testnet.StellarSdk)
          }
          else{
           server = Object.assign( Object.create( Object.getPrototypeOf(global.public.server)), global.public.server)
           StellarSdk =  Object.assign( Object.create( Object.getPrototypeOf(global.public.StellarSdk)), global.public.StellarSdk)
          }
          var memoFinalTrust
          if(typeof memoTypeTrust!= "undefined"){
          switch (memoTypeTrust) {
            case 'text':
              memoFinalTrust = StellarSdk.Memo.text(memoTrust)
              break;
            case 'id':
              memoFinalTrust = StellarSdk.Memo.id(memoTrust)
              break;
            case 'return':
              memoFinalTrust = StellarSdk.Memo.return(memoTrust)
              break;
            default:
              reject('invalid memo type')
              break;
          }
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
          let newAccount=StellarSdk.Keypair.random()
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
                    startingBalance: "1.501" // base reserve 2 + 1 per effettuare circa 100k operazioni
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
                if(typeof memoTypeTrust== "undefined"){
                    resolve({"publicKey":newAccount.publicKey(),
                    "privateKey":newAccount.secret()})
                }
                let asset = new StellarSdk.Asset(assetCode, issuer)
                transaction = new StellarSdk.TransactionBuilder(sourceAccount)
                  .addOperation(StellarSdk.Operation.changeTrust({
                    asset: asset,
                    limit: trustLimit
                  }))
                  .addMemo(memoFinalTrust)
                  .build();
                transaction.sign(newAccount);
                return server.submitTransaction(transaction)
              })
              .then(function (result) {
                resolve({"publicKey":newAccount.publicKey(),
                    "privateKey":newAccount.secret()})
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

  module.exports = {
    createAccount
  }