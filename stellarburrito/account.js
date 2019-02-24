const StellarSdk = require('stellar-sdk')
let config = require('./config')
let server
let env = config.env
if (typeof env != 'undefined' && env === "testnet") {
    StellarSdk.Network.useTestNetwork()
    server = new StellarSdk.Server(config.testnet_horizon)
} else {
    StellarSdk.Network.usePublicNetwork()
    server = new StellarSdk.Server(config.pubnet_horizon)
}
class Account {
    constructor(key) {
        if (typeof key != 'undefined')
            if (key.substring(0, 1) === 's') {
                this.privateKey = key
                this.publicKey = StellarSdk.Keypair.fromSecret(key).publicKey
            }
            else {
                this.publicKey = key
                this.privateKey = null
            }
        else {
            this.publicKey = null
            this.privateKey = null
        }
        this.balances = []
        this.data = []
        this.offers = []
        this.flags = []
        this.signers = []
        this.sequence = null
        this.inflation_destination = null
        this.home_domain = null
        this.thresholds = []
        this.trustlines = []
    }
    newKeypair() {
        key = StellarSdk.Keypair.random()
        this.privateKey = key.secret()
        this.publicKey = key.publicKey()
    }
    async load(key) {
        return new Promise((resolve, reject) => {
            if (key.substring(0, 1) == 'S') {
                this.privateKey = key
                this.publicKey = StellarSdk.Keypair.fromSecret(key).publicKey()
            }
            else {
                this.publicKey = key
                this.privateKey = null
            }
            console.log(this.publicKey)
            let that = this
            server.accounts()
                .accountId(this.publicKey)
                .call()
                .then(function (page) {
                    console.log(page.balances + '\n\r' + page.balances[0] + page.balances.length)
                    for (let i = 0; i < page.balances.length; i++)
                        that.balances.push(page.balances[i])
                    for (let i = 0; i < page.balances.length; i++)
                        if (typeof page.balances[i].asset_issuer != 'undefined')
                            that.trustlines.push({ asset_code: page.balances[i].asset_code, asset_issuer: page.balances[i].asset_issuer })
                    that.data = page.data_attr
                    that.thresholds = page.thresholds
                    for (let i = 0; i < page.signers.length; i++)
                        that.signers.push(page.signers)
                    that.flags = page.flags
                    that.inflation_destination = page.inflation_destination
                    that.home_domain = page.home_domain
                    that.sequence = page.sequence
                    resolve(this)
                })
                .catch(function (error) {
                    reject(error)
                    return
                })
        })
    }
    async getPayments(limit = 10, order = 'desc', cursor = 'now') {
        return new Promise((resolve, reject) => {
            server.payments()
                .forAccount(this.publicKey)
                .order(order)
                .limit(limit)
                .cursor()
                .call()
                .then(function (page) {
                    let i = 0
                    var payments = {
                        payments: []
                    }
                    while (i < page.records.length) {
                        if (page.records[i].type === "payment")
                            payments.payments.push(page.records[i])
                        i++
                    }
                    resolve(payments)
                })
                .catch(function (err) {
                    reject('StellarBurrito_HORIZON_ERR can\'t load payments \n\r' + err)
                })
        })
    }
    async  getTransactions(limit = 10, order = 'desc', cursor = 'now') {
        return new Promise((resolve, reject) => {
            server.transactions()
                .forAccount(this.publicKey)
                .order(order)
                .limit(limit)
                .cursor()
                .call()
                .then(function (page) {
                    let i = 0
                    var transactions = {
                        transactions: []
                    }
                    while (i < page.records.length) {
                        transactions.transactions.push(page.records[i])
                        i++
                    }
                    resolve(transactions)
                })
                .catch(function (err) {
                    reject('StellarBurrito_HORIZON_ERR can\'t load payments \n\r' + err)
                })
        })
    }
    async setOptions(payload) {
        return new Promise((resolve, reject) => {
            let des = StellarSdk.Keypair.fromSecret(this.privateKey)
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
    * @param {string} inflationDest - The public key of inflation destination
    * @param {number} timeout - Timeout in seconds
    */
    async setInlationDestination(inflationDest) {
        return new Promise((resolve, reject) => {
            let that = this
            this.setOptions({ inflationDest })
                .then(function (result) {
                    that.inflation_destination = inflationDest
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
* @param {string} homeDomain - The homedomain that you want to set
* @param {number} timeout - Timeout in seconds
*/
    async  setHomeDomain(homeDomain) {
        return new Promise((resolve, reject) => {
            let that = this
            setOptions({ homeDomain })
                .then(function (result) {
                    that.load(that.publicKey())
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
    * @param {string} Flag -1 for Authorization required 2 for Authorization revocable 4 forAuthorization immutable 
    * @param {number} timeout - Timeout in seconds
    */
    async  setFlag(Flag) {
        return new Promise((resolve, reject) => {
            let that = this
            if (Flag != 1 && Flag != 2 && Flag != 4)
                reject({
                    message: 'Allowed flag values ==> 1 , 2 , 4',
                    error: 'Incorrect flag.'
                })
            setOptions({ setFlags: Flag })
                .then(function (result) {
                    that.load(that.publicKey())
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
    * @param {string} Flag -1 for Authorization required 2 for Authorization revocable 4 forAuthorization immutable 
    * @param {number} timeout - Timeout in seconds
    */
    async  clearFlag(Flag) {
        return new Promise((resolve, reject) => {
            let that = this
            if (Flag != 1 && Flag != 2 && Flag != 4)
                reject({
                    message: 'Allowed flag values ==> 1 , 2 , 4',
                    error: 'Incorrect flag.'
                })
            setOptions({ clearFlags: Flag })
                .then(function (result) {
                    that.load(that.publicKey())
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
    * @param {string} signerPubKey - The public key of the new signer 
    * @param {number} weight - weight for the signer 0-255
    * @param {number} timeout - Timeout in seconds
    */
    async  setSigner(signerPubKey, weight) {
        return new Promise((resolve, reject) => {
            let payload = {
                ed25519PublicKey: signerPubKey,
                weight
            }
            let that = this
            setOptions(payload, timeout)
                .then(function (result) {
                    that.load(that.publicKey())
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
    * @param {number} lowThreshold - The value of Threshold 0-255
    * @param {number} timeout - Timeout in seconds
    */
    async  setLowThreshold(lowThreshold) {
        return new Promise((resolve, reject) => {
            let that = this
            setOptions({ lowThreshold })
                .then(function (result) {
                    that.lowThreshold = lowThreshold
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
    * @param {number} medThreshold - The value of Threshold 0-255
    * @param {number} timeout - Timeout in seconds
    */
    async  setMediumThreshold(medThreshold) {
        return new Promise((resolve, reject) => {
            let that = this
            setOptions({ medThreshold })
                .then(function (result) {
                    that.medThreshold = medThreshold
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
    * @param {number} highThreshold - The value of Threshold 0-255
    * @param {number} timeout - Timeout in seconds
    */
    async  setHighThreshold(highThreshold) {
        return new Promise((resolve, reject) => {
            let that = this
            setOptions({ highThreshold })
                .then(function (result) {
                    that.highThreshold = highThreshold
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
    * @param {number} masterWeight - The weight of master key 0-255
    * @param {number} timeout - Timeout in seconds
    */
    async  setMasterWeight(masterWeight) {
        return new Promise((resolve, reject) => {
            let that = this
            setOptions({ masterWeight })
                .then(function (result) {
                    that.masterWeight = masterWeight
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
    * @param {number} bumpTo - The sequence number from 0-9223372036854775807
    * @param {number} timeout - Timeout in seconds
    */
    async  bumpSequence(bumpTo) {
        return new Promise((resolve, reject) => {
            let that = this
            setOptions({ bumpTo })
                .then(function (result) {
                    that.sequence = bumpTo
                    resolve(result)
                })
                .catch(function (error) {
                    reject('Tx error_' + error)
                })
        })
    }
}
module.exports = Account