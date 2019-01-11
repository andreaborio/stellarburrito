/**
 * transactionsHistory
 * retrive history of transactions of an account from horizon
 * @param {string} account - The public key of the account.      
 * @param {number} limit - Max limit of transactions that you want
 * @param {string} order - The order of the results ASC DESC
 * @param {string} cursor - The cursor for querying payments 
 */
async function paymentsHistory(account, limit = 10, order='desc',cursor='now') {
	return new Promise((resolve, reject) => {
		let global = require('../settings/global')
		let config = require('../settings/config')
		let env = config.env
		global.init()
			.then(function (global) {
				let server
				let env = config.env
				if (typeof env != 'undefined' && env === "testnet") 
					server = Object.assign(Object.create(Object.getPrototypeOf(global.test.server)), global.test.server)
				else 
					server = Object.assign(Object.create(Object.getPrototypeOf(global.pub.server)), global.pub.server)
				server.payments()
					.forAccount(account)
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
	})
}
module.exports = {
	paymentsHistory
}