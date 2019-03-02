const StellarSdk = require('stellar-sdk')
const config = require('./config')
let server
const env = config.env
const errorManager = require('./error')
const memoCreator = require('./memo')
if (typeof env != 'undefined' && env === "testnet") {
    StellarSdk.Network.useTestNetwork()
    server = new StellarSdk.Server(config.testnet_horizon)
} else {
    StellarSdk.Network.usePublicNetwork()
    server = new StellarSdk.Server(config.pubnet_horizon)
}
class Asset {
    constructor(code, issuer) {
        this.code = code
        this.issuer = issuer
        this.amount = null
        this.holders = null
        this.type = null
        this.paging_token = null
        this.amount = null
        this.num_accounts = 0
        this.flags = {
            auth_required: null,
            auth_revocable: null,
            auth_immutable: null
        }
    }
}
module.exports = Asset