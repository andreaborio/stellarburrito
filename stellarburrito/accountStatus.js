/**
 * getAccount
 * retrive account from horizon
 * @param {string} pubKey - The publicKey of the account
 */
async function getAccount(pubKey) {
	return new Promise((resolve, reject) => {
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
		server.accounts()
			.accountId(pubKey)
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
 * getBalances
 * retrive account balances from horizon
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
			})

	})
}
/**
 * getData
 * retrive account data from horizon
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
			})

	})
}
async function getThresholds(pubKey) {
	return new Promise((resolve, reject) => {
		getAccount(pubKey)
			.then(page => {
				resolve(page.thresholds)
			})
			.catch(function (error) {
				reject(error)
			})

	})
}
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
			})

	})
}
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
async function getInflationDestination(pubKey) {
	return new Promise((resolve, reject) => {
		getAccount(pubKey)
			.then(page => {
				resolve(page.inflation_destination)
			})
			.catch(function (error) {
				reject(error)
			})

	})
}
async function getHomeDomain(pubKey) {
	return new Promise((resolve, reject) => {
		getAccount(pubKey)
			.then(page => {
				resolve(page.home_domain)
			})
			.catch(function (error) {
				reject(error)
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
	getData
}