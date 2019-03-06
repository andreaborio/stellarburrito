const StellarSdk = require('stellar-sdk')
const config = require('./config')
let server
const env = config.env
const Account = require('./account')
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
    /**
     * 
     * @param {string} code  -> Asset Code 
     * @param {string} issuer -> Asset issuer
     */
    constructor(code, issuer) {
        this.code = code
        this.issuer = issuer
        this.amount = null
        this.type = null
        this.paging_token = null
        this.toml = null
        this.num_accounts = 0
        this.flags = {
            auth_required: null,
            auth_revocable: null,
            auth_immutable: null
        }
    }
    async Load() {
        return new Promise((resolve, reject) => {
            if (!StellarSdk.StrKey.isValidEd25519PublicKey(this.issuer)) {
                throw 'Please verify your publicKey'
                return
            }
            let that = this
            server.assets()
                .forIssuer(this.issuer)
                .forCode(this.code)
                .call()
                .then(function (page) {
                    that.amount = page.records[0].amount
                    that.type = page.records[0].asset_type
                    that.paging_token = page.records[0].paging_token
                    that.toml = page.records[0].toml
                    that.num_accounts = page.records[0].num_accounts
                    that.flags = {
                        auth_required: page.records[0].flags.auth_required,
                        auth_revocable: page.records[0].flags.auth_revocable,
                        auth_immutable: page.records[0].flags.auth_immutable
                    }
                    resolve()
                })
                .catch(function (error) {
                    reject(error)
                    return
                })
        })
    }
    /**
 * @param {Number} cursor - Use as page index for explore all assets
 * @param {Number} limit  - How much assets you want back
 */
    async  getAssets(cursor = 1, limit = 10) {
        return new Promise((resolve, reject) => {
            server.assets()
                .limit(limit)
                .cursor(cursor)
                .call()
                .then(function (page) {
                    resolve(page)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }
    /**
     * @param {string} assetIssuer - Asset Issuer
     */
    async  getAssetsForIssuer(assetIssuer) {
        return new Promise((resolve, reject) => {
            server.assets()
                .forIssuer(assetIssuer)
                .call()
                .then(function (page) {
                    resolve(page)
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }
    /**
     * Create asset
     * Sender pays receiver an amount of coin.
     * you can specify more than one receiver and use custom asset and custom memo
     * @param {string} opts#issuer - The private key of the issuer.      
     * @param {string} opts#distributor - The secret key of the distributor
     * @param {string} opts#amount - The amount of coins that sender pays to receiver 
     * @param {string} opts#assetCode - The assetCode of the asset that you want to trust
     */
    async createAsset(opts = {}) {
        return new Promise((resolve, reject) => {
            let issuer = opts.issuer || 'error'
            let distributor = opts.distributor || 'error'
            if (typeof issuer == 'object' && issuer.constructor.name == "Account")
                issuer = issuer.privateKey
            else if (!StellarSdk.StrKey.isValidEd25519SecretSeed(issuer)) {
                reject('Invalid issuer ' + errorManager('keyPair', -1))
                return
            }
            if (typeof distributor == 'object' && distributor.constructor.name == "Account")
                distributor = distributor.privateKey
            else if (!StellarSdk.StrKey.isValidEd25519SecretSeed(distributor)) {
                reject('Invalid distributor ' + errorManager('keyPair', -1))
                return
            }

            let amount = opts.amount || 'error'
            let fee = opts.fee || 100
            let assetCode = opts.assetCode || 'error'
            let errors = ""
            if (assetCode === 'error') errors += 'Invalid AssetCode '
            if (amount === 'error') errors += 'Invalid Amount '
            if (errors.length > 0) {
                reject(errors)
                return
            }
            let dist = new Account(distributor)
            let iss = new Account(issuer)
            let that = this
            dist.changeTrust(iss, assetCode, amount)
                .then(res => {
                    iss.Pay({ destination: dist, amount, assetCode, issuer: iss })
                        .then(function (res) {
                            that.code = assetCode
                            that.issuer = iss.publicKey
                            that.amount = amount
                            resolve('Asset created')
                            return
                        })
                        .catch(function (err) {
                            reject(err)
                            return
                        })

                })
                .catch(function (err) {
                    reject(err)
                    return
                })
        })
    }
}
module.exports = Asset