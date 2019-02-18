let config = require('./config')
let server
let env = config.env
let StellarSdk = require('stellar-sdk')
if (typeof env != 'undefined' && env === "testnet") {
	StellarSdk.Network.useTestNetwork()
	server = new StellarSdk.Server(config.testnet_horizon)
} else {
	StellarSdk.Network.usePublicNetwork()
	server = new StellarSdk.Server(config.pubnet_horizon)
}
/**
 * getAccount
 * retrive account from horizon
 * @param {string} pubKey - The publicKey of the account
 */
async function getAccount(pubKey) {
	return new Promise((resolve, reject) => {
		server.accounts()
			.accountId(pubKey)
			.call()
			.then(function (page) {
				resolve(page)
			})
			.catch(function (error) {
				reject(error)
				return
			})
	})
}
/**
 * getBalances
 * retrive account's balances from horizon
 * @param {string} pubKey - The publicKey of the account
 */
async function getBalances(pubKey) {
	return new Promise((resolve, reject) => {
		getAccount(pubKey)
			.then(page => {
				let balances = {
					balances: []
				}
				for (let i = 0; i < page.balances.length; i++)
					balances.balances.push(page.balances[i])
				resolve(balances)
			})
			.catch(function (error) {
				reject(error)
				return
			})

	})
}
/**
 * getTrustlines
 * retrive account's balances from horizon
 * @param {string} pubKey - The publicKey of the account
 */
async function getTrustlines(pubKey) {
	return new Promise((resolve, reject) => {
		getAccount(pubKey)
			.then(page => {
				let assets = { assets: [] }
				for (let i = 0; i < page.balances.length; i++)
					if (typeof page.balances[i].asset_issuer != 'undefined')
						assets.assets.push({ asset_code: page.balances[i].asset_code, asset_issuer: page.balances[i].asset_issuer })
				resolve(assets)
			})
			.catch(function (error) {
				reject(error)
				return
			})

	})
}
/**
 * getData
 * retrive account's data from horizon
 * @param {string} pubKey - The publicKey of the account
 */
async function getData(pubKey) {
	return new Promise((resolve, reject) => {
		getAccount(pubKey)
			.then(page => {
				resolve(page.data_attr)
			})
			.catch(function (error) {
				reject(error)
				return
			})

	})
}
/**
 * getOffers
 * retrive account's offers from horizon
 * @param {string} pubKey - The publicKey of the account
 * @param {number} limit - How much offer you want back 
 */
async function getOffers(pubKey, limit = 10) {
	return new Promise((resolve, reject) => {
		server.offers('accounts', pubKey)
			.limit(limit)
			.call()
			.then(page => {
				resolve(page)
			})
			.catch(function (error) {
				reject(error)
				return
			})

	})
}
/**
 * getThresholds
 * retrive account thresholds from horizon
 * @param {string} pubKey - The publicKey of the account
 */
async function getThresholds(pubKey) {
	return new Promise((resolve, reject) => {
		getAccount(pubKey)
			.then(page => {
				resolve(page.thresholds)
			})
			.catch(function (error) {
				reject(error)
				return
			})

	})
}
/**
 * getData
 * retrive account's signers from horizon
 * @param {string} pubKey - The publicKey of the account
 */
async function getSigners(pubKey) {
	return new Promise((resolve, reject) => {
		getAccount(pubKey)
			.then(page => {
				let signers = {
					signers: []
				}
				for (let i = 0; i < page.signers.length; i++)
					signers.signers.push(page.signers)
				resolve(signers)
			})
			.catch(function (error) {
				reject(error)
				return
			})

	})
}
/**
 * getFlags
 * retrive account's flags from horizon
 * @param {string} pubKey - The publicKey of the account
 */
async function getFlags(pubKey) {
	return new Promise((resolve, reject) => {
		getAccount(pubKey)
			.then(page => {
				resolve(page.flags)
			})
			.catch(function (error) {
				reject(error)
			})

	})
}
/**
 * getInflationDestination
 * retrive account's inflationDestination from horizon
 * @param {string} pubKey - The publicKey of the account
 */
async function getInflationDestination(pubKey) {
	return new Promise((resolve, reject) => {
		getAccount(pubKey)
			.then(page => {
				resolve(page.inflation_destination)
			})
			.catch(function (error) {
				reject(error)
				return
			})

	})
}
/**
 * getHomeDomain
 * retrive account's homedomain from horizon
 * @param {string} pubKey - The publicKey of the account
 */
async function getHomeDomain(pubKey) {
	return new Promise((resolve, reject) => {
		getAccount(pubKey)
			.then(page => {
				resolve(page.home_domain)
			})
			.catch(function (error) {
				reject(error)
				return
			})

	})
}
/**
 * getSequenceNumber
 * retrive account's sequence number from horizon
 * @param {string} pubKey - The publicKey of the account
 */
async function getSequenceNumber(pubKey) {
	return new Promise((resolve, reject) => {
		getAccount(pubKey)
			.then(page => {
				resolve(page.sequence)
			})
			.catch(function (error) {
				reject(error)
				return
			})

	})
}
module.exports = {
	getAccount,
	getBalances,
	getThresholds,
	getSigners,
	getFlags,
	getInflationDestination,
	getHomeDomain,
	getData,
	getSequenceNumber,
	getTrustlines,
	getOffers
}