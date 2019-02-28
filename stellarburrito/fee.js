const axios = require('axios')
const https = require('https')
const httpsAgent = new https.Agent({
    rejectUnauthorized: false
})
class Fee {
    constructor() {
        this.last_ledger = '0'
        this.last_ledger_base_fee = null
        this.ledger_capacity_usage = null
        this.min_accepted_fee = '100'
        this.mode_accepted_fee = null
        this.p10_accepted_fee = null
        this.p20_accepted_fee = null
        this.p30_accepted_fee = null
        this.p40_accepted_fee = null
        this.p50_accepted_fee = null
        this.p60_accepted_fee = null
        this.p70_accepted_fee = null
        this.p80_accepted_fee = null
        this.p90_accepted_fee = null
        this.p95_accepted_fee = null
        this.p99_accepted_fee = null
        this.HighPriority='1000'
        this.MediumPriority='500'
        this.LowProprity='100'

    }
    async Load() {
        return new Promise((resolve, reject) => {
            let that = this
            axios.get('https://horizon-mon.stellar-ops.com/fee_stats', {
                httpsAgent
            })
                .then(function (response) {
                    that.last_ledger = response.data.last_ledger
                    that.last_ledger_base_fee = response.data.last_ledger_base_fee
                    that.ledger_capacity_usage = response.data.ledger_capacity_usage
                    that.min_accepted_fee = response.data.min_accepted_fee
                    that.mode_accepted_fee = response.data.mode_accepted_fee
                    that.p10_accepted_fee = response.data.p10_accepted_fee
                    that.p20_accepted_fee = response.data.p20_accepted_fee
                    that.p30_accepted_fee = response.data.p30_accepted_fee
                    that.p40_accepted_fee = response.data.p40_accepted_fee
                    that.p50_accepted_fee = response.data.p50_accepted_fee
                    that.p60_accepted_fee = response.data.p60_accepted_fee
                    that.p70_accepted_fee = response.data.p70_accepted_fee
                    that.p80_accepted_fee = response.data.p80_accepted_fee
                    that.p90_accepted_fee = response.data.p90_accepted_fee
                    that.p95_accepted_fee = response.data.p95_accepted_fee
                    that.p99_accepted_fee = response.data.p99_accepted_fee
                    that.HighPriority = that.p95_accepted_fee
                    that.MediumPriority = that.p60_accepted_fee
                    that.LowProprity = that.p10_accepted_fee
                    resolve()
                })
                .catch(function (error) {
                    reject(error)
                })
        })
    }
}
module.exports = Fee