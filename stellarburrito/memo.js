const errorManager = require('./error')
const StellarSdk = require('stellar-sdk')
function memoCreator(type, payload) {
    let memo = ""
    let error = false
    switch (type) {
        case 'text':
            if (payload.length > 28) {
                memo = errorManager('memo', -2)
                error = true
            }
            else
                memo = StellarSdk.Memo.text(payload)
            break;
        case 'id':
            if (payload > 18446744073709551615 || payload < 0) {
                memo = errorManager('memo', -3)
                error = true
            }
            else
                memo = StellarSdk.Memo.id(payload)
            break;
        case 'return':
            if (payload.length > 28) {
                memo = errorManager('memo', -4)
                error = true
            }
            else
                memo = StellarSdk.Memo.return(payload)
            break;
        default:
            memo = errorManager('memo', -1)
            error = true
    }
    return { memo, error }
}
module.exports = memoCreator