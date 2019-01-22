/* eslint-disable no-plusplus */
/* eslint-disable prefer-reflect */
/* eslint-disable id-length */
/* eslint-disable no-magic-numbers */
/* eslint-disable no-tabs */
/**
 * getLedgers
 * retrive ledgers from horizon    
 * @param {number} limit - Max limit of transactions that you want
 * @param {string} order - The order of the results ASC DESC
 * @param {string} cursor - The cursor for querying payments 
 * @return {JSON} result - Ledgers json
 */
async function getLedgers(limit = 10, order = 'desc', cursor = 'now') {
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
		server.ledgers()
			.order(order)
			.limit(limit)
			.cursor(cursor)
			.call()
			.then(function (page) {
				let ledgers = {
					ledgers: []
				};
				let i = 0
				while (i < page.records.length) {
					ledgers.ledgers.push({
						'id': page.records[i].id,
						'paging_token': page.records[i].paging_token,
						'hash': page.records[i].hash,
						'prev_hash': page.records[i].prev_hash,
						'sequence': page.records[i].sequence,
						'transaction_count': page.records[i].transaction_count,
						'operation_count': page.records[i].operation_count,
						'closed_at': page.records[i].closed_at,
						'total_coins': page.records[i].total_coins,
						'fee_pool': page.records[i].fee_pool,
						'base_fee_in_stroops': page.records[i].base_fee_in_stroops,
						'base_reserve_in_stroops': page.records[i].base_reserve_in_stroops,
						'max_tx_set_size': page.records[i].max_tx_set_size,
						'protocol_version': page.records[i].protocol_version,
						'header_xdr': page.records[i].header_xdr
					})
					i++
				}
				resolve(ledgers)
			})
			.catch(function (err) {
				reject('StellarBurrito_HORIZON_ERR can\'t load ledgers \n\r' + err)
			})
	})
}
module.exports = {
	getLedgers
}