/**
 * changeTrust function
 *
 * @constructor
 * @param {string} privKey - The private key of the account.
 * @param {string} memoType - The type of memo the transaction that you want create (text,id,return)
 * @param {string} memo - The content of memo the change trust transaction that you want create (text,id,return)
 * @param {string} issuer - The public key of the issuer 
 * @param {string} assetCode - The assetCode of the asset that you want to trust
 * @param {string} trustLimit - The amount of coin that you want to trust from this issuer
 * @author Andrea Borio andrea.borio@outlook.com
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
            memoFinal = StellarSdk.Memo.text("ok")
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
module.exports = {
  changeTrust
}