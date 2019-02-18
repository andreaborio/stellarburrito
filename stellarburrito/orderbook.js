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
async function getOrderbook(sellingCode = 'native', sellingIssuer = 'native', buyingCode = 'native', buyingIssuer = 'native', limit = '10') {
	return new Promise((resolve, reject) => {
		let sellingAsset
		try {
			if (sellingIssuer === 'native')
				sellingAsset = new StellarSdk.Asset.native()
			else
				sellingAsset = new StellarSdk.Asset(sellingCode, sellingIssuer)
		} catch (err) {
			reject(err)
			return
		}
		let buyingAsset
		try {
			if (buyingIssuer === 'native')
				buyingAsset = new StellarSdk.Asset.native()
			else
				buyingAsset = new StellarSdk.Asset(buyingCode, buyingIssuer)
		} catch (err) {
			reject(err)
			return
		}
		server.orderbook(buyingAsset, sellingAsset)
			.limit(limit)
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
module.exports =  getOrderbook 