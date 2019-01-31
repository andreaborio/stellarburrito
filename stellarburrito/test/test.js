const accountOperations = require('../accountOperations')
const accountStatus = require('../accountStatus')
const assetOperations = require('../assetOperations')
const paymentOperations = require('../paymentOperations')
const offerOperations = require('../offerOperations')
const history = require('../history')
const ledgers = require('../ledger')
const accountOptions=require('../accountOptions')
const config = require('../config')
const StellarSdk = require('stellar-sdk')
const chai = require('chai')
    .use(require('chai-as-promised'))
const expect = chai.expect;
let accountTrust = 'SDUSO5W2WU2FEMRKAGXFMZUEJ4RYCCKZYE2UADVRU4APLIVGV5K5Y5LC'
let alice = StellarSdk.Keypair.fromSecret(accountTrust)
let accountDistributor = config.testaccount
let bob = StellarSdk.Keypair.fromSecret(accountDistributor)
let distributor = 'SCNIYIP6WLTJYOXBQVAWQQJMYIXIIAGFKEJDAZPY4T5FUZL2OODV5PNR'
let issuer = 'SCYTGAZEMS4Y3EUX2DBAKQPVX6AK4N6OMIKJQXYCRFC573DAECWLFYYY'
let distributorPair = StellarSdk.Keypair.fromSecret(distributor)
let issuerPair = StellarSdk.Keypair.fromSecret(issuer)
let privKeyCreate = ''
let asset =""
function random() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 12; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
console.log(bob.publicKey)
console.log('alice '+alice.publicKey()+ '\n\r bob '+bob.publicKey())
step('accountOperations', function () {
    describe('Create new account', () => {
        it('accountOperations.createAccount', (done) => {
            const resolvingPromise = accountOperations.createAccount(config.testaccount)
            resolvingPromise.then((result) => {
                privKeyCreate = result.privateKey
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
step('accountOperations', function () {
    describe('Trust new asset', () => {
        it('accountOperations.changeTrust', (done) => {
            const resolvingPromise = accountOperations.changeTrust(alice.secret(), 'GCNSGHUCG5VMGLT5RIYYZSO7VQULQKAJ62QA33DBC5PPBSO57LFWVV6P', 'ETH', '1')
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
step('accountOperations', function () {
    describe('Manage Data', () => {
        it('accountOperations.manageData', (done) => {
            accountOperations.manageData(alice.secret(), 'stellar', 'burrito')
                .then((result) => {
                    expect(1).to.equal(1);
                    done()
                })
                .catch(error => {
                    console.log(error)
                })
        }).timeout(25000)
    })
})
step('accountOperations', function () {
    describe('Create new account', () => {
        it('accountOperations.createAccount', (done) => {
            const resolvingPromise = accountOperations.mergeAccount(privKeyCreate, alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
step('assetOperations', function () {
    describe('Create new asset', () => {
        it('assetOperations.createAsset', (done) => {
            asset=random()
            const resolvingPromise = assetOperations.createAsset( alice.secret(),bob.secret(), '100000', asset)
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
step('paymentOperations', function () {
    describe('Pay from alice to bob', () => {
        it('paymentOperations.Pay', (done) => {
            const resolvingPromise = paymentOperations.Pay(alice.secret(), bob.publicKey(), '0.0000001')
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
step('history', function () {
    describe('Get payments history', () => {
        it('history.paymentHistory', (done) => {
            const resolvingPromise = history.paymentsHistory(alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
step('history', function () {
    describe('Get transactions history', () => {
        it('history.paymentHistory', (done) => {
            const resolvingPromise = history.transactionsHistory(alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
step('ledger', function () {
    describe('Get ledger', () => {
        it('ledger.getLedgers', (done) => {
            const resolvingPromise = ledgers.getLedgers(1, 'asc')
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
step('offerOperations', function () {
    describe('Create Passive Offer', () => {
        it('offerOperations.createPassiveOffer', (done) => {
            const resolvingPromise = offerOperations.createPassiveOffer(bob.secret(), asset, alice.publicKey(), '1', {
                'd': 1,
                'n': 1
            }, '0', '0wz05f6gUftu', alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
step('offerOperations', function () {
    describe('Manage Offer', () => {
        it('offerOperations.createPassiveOffer', (done) => {
            const resolvingPromise = offerOperations.manageOffer(bob.secret(), asset, alice.publicKey(), '1', {
                'd': 1,
                'n': 1
            }, '0', '0wz05f6gUftu', alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
step('account Status', function () {
    describe('Get Account', () => {
        it('accountStatus.getAccount', (done) => {
            const resolvingPromise = accountStatus.getAccount(alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
step('account Status', function () {
    describe('Get Balances', () => {
        it('accountStatus.getBalances', (done) => {
            const resolvingPromise = accountStatus.getBalances(alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
step('account Status', function () {
    describe('Get Data', () => {
        it('accountStatus.getData', (done) => {
            const resolvingPromise = accountStatus.getData(alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
step('account Status', function () {
    describe('Get Flags', () => {
        it('accountStatus.getFlags', (done) => {
            const resolvingPromise = accountStatus.getFlags(alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
step('account Status', function () {
    describe('Get Home Domain', () => {
        it('accountStatus.getHomeDomain', (done) => {
            const resolvingPromise = accountStatus.getHomeDomain(alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
step('account Status', function () {
    describe('Get Inflation Destination', () => {
        it('accountStatus.getInflationDestination', (done) => {
            const resolvingPromise = accountStatus.getInflationDestination(alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
step('account Status', function () {
    describe('Get Signers ', () => {
        it('accountStatus.getInflationDestination', (done) => {
            const resolvingPromise = accountStatus.getSigners(alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
step('account Status', function () {
    describe('Get Thresholds ', () => {
        it('accountStatus.getThresholds', (done) => {
            const resolvingPromise = accountStatus.getThresholds(alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
step('account Options', function () {
    describe('Set Flag ', () => {
        it('accountOptions.setFlag', (done) => {
            const resolvingPromise = accountOptions.setFlag(alice.secret(),1)
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
step('account Options', function () {
    describe('Clear Flag ', () => {
        it('accountOptions.clearFlags', (done) => {
            const resolvingPromise = accountOptions.clearFlags(alice.secret(),'1')
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
step('account Options', function () {
    describe('Set HomeDomain ', () => {
        it('accountOptions.setHomeDomain', (done) => {
            const resolvingPromise = accountOptions.setHomeDomain(alice.secret(),'stellar.burrito')
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
step('account Options', function () {
    describe('Set InflationDestination ', () => {
        it('accountOptions.setInflationDestination', (done) => {
            const resolvingPromise = accountOptions.setInlationDestination(alice.secret(),bob.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
step('account Options', function () {
    describe('Set Master Weight ', () => {
        it('accountOptions.setMasterWeight', (done) => {
            const resolvingPromise = accountOptions.setMasterWeight(alice.secret(),'230')
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
step('account Options', function () {
    describe('Set Low Threshold ', () => {
        it('accountOptions.setLowThreshold', (done) => {
            const resolvingPromise = accountOptions.setLowThreshold(alice.secret(),'50')
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
step('account Options', function () {
    describe('Set Medium Threshold ', () => {
        it('accountOptions.setMediumThreshold', (done) => {
            const resolvingPromise = accountOptions.setMediumThreshold(alice.secret(),'50')
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
step('account Options', function () {
    describe('Set High Threshold ', () => {
        it('accountOptions.setHighThreshold', (done) => {
            const resolvingPromise = accountOptions.setHighThreshold(alice.secret(),'50')
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})