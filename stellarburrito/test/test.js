const accountOperations = require('../accountOperations')
const accountStatus = require('../accountStatus')
const assetOperations = require('../assetOperations')
const Pay = require('../paymentOperations')
const offerOperations = require('../offerOperations')
const history = require('../history')
const ledgers = require('../ledger')
const accountOptions = require('../accountOptions')
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
let carl = StellarSdk.Keypair.fromSecret('SA74HZ5F5PIJWH26QBYXCKGHRMNB4VRMMPSVCWTYA4UZBBJX6TZZ5CIZ')
let donald = StellarSdk.Keypair.fromSecret('SAIOAGOJCGBGI73CGWLUDZZPZQWJW75PYGGD2OOD6NIS2TTCNF7QY7YX')
let privKeyCreate = ''
let asset = ""
function random() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 12; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
    step('Create new account', () => {
        describe('StellarBurrito test',function (){
        it('accountOperations.createAccount', (done) => {
            const resolvingPromise =  accountOperations.createAccount(config.testaccount)
            resolvingPromise.then((result) => {
                privKeyCreate = result.privateKey
                expect(1).to.equal(1);
                done();
            })
                .catch((error) => {
                    console.log(error)
                    expect(1).to.equal(4)
                    done()
                })
        }).timeout(30000)
    })
})

    step('Trust new asset', () => {
        describe('StellarBurrito test',function (){
        it('accountOperations.changeTrust', (done) => {
            const resolvingPromise = accountOperations.changeTrust(alice.secret(), 'GCNSGHUCG5VMGLT5RIYYZSO7VQULQKAJ62QA33DBC5PPBSO57LFWVV6P', 'ETH', '1')
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
                .catch((error) => {
                    console.log(error)
                    expect(1).to.equal(4)
                    done()
                })
        }).timeout(30000)
    })
})
    step('Manage Data', () => {
        describe('StellarBurrito test',function (){
        it('accountOperations.manageData', (done) => {
            accountOperations.manageData(alice.secret(), 'stellar', 'burrito')
                .then((result) => {
                    expect(1).to.equal(1);
                    done()
                })
                .catch((error) => {
                    console.log(error)
                    expect(1).to.equal(4)
                    done()
                })
        }).timeout(25000)
    })
})
    step('Merge account', () => {
        describe('StellarBurrito test',function (){
        it('accountOperations.mergeAccount', (done) => {
            const resolvingPromise = accountOperations.mergeAccount(privKeyCreate, alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
                .catch((error) => {
                    console.log(error)
                    expect(1).to.equal(4)
                    done()
                })
        }).timeout(30000)
    })
    })
    step('Create new asset', () => {
        describe('StellarBurrito test',function (){
        it('assetOperations.createAsset', (done) => {
            asset = random()
            const resolvingPromise = assetOperations.createAsset(carl.secret(), donald.secret(), '100000', asset)
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
                .catch((error) => {
                    console.log(error)
                    expect(1).to.equal(4)
                    done()
                })
        }).timeout(30000)
    })
})
    step('Pay from alice to bob', () => {
        it('paymentOperations.Pay', (done) => {
            describe('StellarBurrito test',function (){
            const resolvingPromise = Pay(carl.secret(), donald.publicKey(), '0.000001')
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
                .catch((error) => {
                    console.log(error)
                    expect(1).to.equal(4)
                    done()
                })
        }).timeout(30000)
    })
})
    step('Get payments history', () => {
        it('history.paymentHistory', (done) => {
            describe('StellarBurrito test',function (){
            const resolvingPromise = history.paymentsHistory(alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
                .catch((error) => {
                    console.log(error)
                    expect(1).to.equal(4)
                    done()
                })
        }).timeout(30000)
    })
})
    step('Get transactions history', () => {
        describe('StellarBurrito test',function (){
        it('history.paymentHistory', (done) => {
            const resolvingPromise = history.transactionsHistory(alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
                .catch((error) => {
                    console.log(error)
                    expect(1).to.equal(4)
                    done()
                })
        }).timeout(30000)
    })
})
    step('Get ledger', () => {
        it('ledger.getLedgers', (done) => {
            describe('StellarBurrito test',function (){
            const resolvingPromise = ledgers.getLedgers(1, 'asc')
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
                .catch((error) => {
                    console.log(error)
                    expect(1).to.equal(4)
                    done()
                })
        }).timeout(30000)
    })
    })
    step('Create Passive Offer', () => {
        describe('StellarBurrito test',function (){
        it('offerOperations.createPassiveOffer', (done) => {
            const resolvingPromise = offerOperations.createPassiveOffer(donald.secret(), asset, carl.publicKey(), '1', {
                'd': 1,
                'n': 1
            }, '0')
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
                .catch((error) => {
                    console.log(error)
                    expect(1).to.equal(4)
                    done()
                })
        }).timeout(30000)
    })
})
    step('Manage Offer', () => {
        describe('StellarBurrito test',function (){
        it('offerOperations.createPassiveOffer', (done) => {
            const resolvingPromise = offerOperations.manageOffer(donald.secret(), asset, carl.publicKey(), '1', {
                'd': 1,
                'n': 1
            }, '0', 'u28qamPiB9Ze', carl.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
                .catch((error) => {
                    console.log(error)
                    expect(1).to.equal(4)
                    done()
                })
        }).timeout(30000)
    })
})
    step('Get Account', () => {
        describe('StellarBurrito test',function (){
        it('accountStatus.getAccount', (done) => {
            const resolvingPromise = accountStatus.getAccount(alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
                .catch((error) => {
                    console.log(error)
                    expect(1).to.equal(4)
                    done()
                })
        }).timeout(30000)
    })
})
    step('Get Balances', () => {
        describe('StellarBurrito test',function (){
        it('accountStatus.getBalances', (done) => {
            const resolvingPromise = accountStatus.getBalances(alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
                .catch((error) => {
                    console.log(error)
                    expect(1).to.equal(4)
                    done()
                })
        }).timeout(30000)
    })
})
    step('Get Data', () => {
        describe('StellarBurrito test',function (){
        it('accountStatus.getData', (done) => {
            const resolvingPromise = accountStatus.getData(alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
                .catch((error) => {
                    console.log(error)
                    expect(1).to.equal(4)
                    done()
                })
        }).timeout(30000)
    })
})
    step('Get Flags', () => {
        describe('StellarBurrito test',function (){
        it('accountStatus.getFlags', (done) => {
            const resolvingPromise = accountStatus.getFlags(alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
                .catch((error) => {
                    console.log(error)
                    expect(1).to.equal(4)
                    done()
                })
        }).timeout(30000)
    })
})
    step('Get Home Domain', () => {
        describe('StellarBurrito test',function (){
        it('accountStatus.getHomeDomain', (done) => {
            const resolvingPromise = accountStatus.getHomeDomain(alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            }).catch((error) => {
                console.log(error)
                expect(1).to.equal(4)
                done()
            })
        }).timeout(30000)
    })
})
    step('Get Inflation Destination', () => {
        describe('StellarBurrito test',function (){
        it('accountStatus.getInflationDestination', (done) => {
            const resolvingPromise = accountStatus.getInflationDestination(alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            }).catch((error) => {
                console.log(error)
                expect(1).to.equal(4)
                done()
            })
        }).timeout(30000)
    })
})
    step('Get Signers ', () => {
        describe('StellarBurrito test',function (){
        it('accountStatus.getInflationDestination', (done) => {
            const resolvingPromise = accountStatus.getSigners(alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            }).catch((error) => {
                console.log(error)
                expect(1).to.equal(4)
                done()
            })
        }).timeout(30000)
    })
})
    step('Get Thresholds ', () => {
        describe('StellarBurrito test',function (){
        it('accountStatus.getThresholds', (done) => {
            const resolvingPromise = accountStatus.getThresholds(alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            }).catch((error) => {
                console.log(error)
                expect(1).to.equal(4)
                done()
            })
        }).timeout(30000)
    })
})
    step('Get Trustlines ', () => {
        describe('StellarBurrito test',function (){
        it('accountStatus.getThresholds', (done) => {
            const resolvingPromise = accountStatus.getTrustlines(alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            }).catch((error) => {
                console.log(error)
                expect(1).to.equal(4)
                done()
            })
        }).timeout(30000)
    })
})
    step('Get SequenceNumber ', () => {
        describe('StellarBurrito test',function (){
        it('accountStatus.getSequenceNumber', (done) => {
            const resolvingPromise = accountStatus.getSequenceNumber(alice.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            }).catch((error) => {
                console.log(error)
                expect(1).to.equal(4)
                done()
            })
        }).timeout(30000)
    })
})
    step('Set Flag ', () => {
        describe('StellarBurrito test',function (){
        it('accountOptions.setFlag', (done) => {
            const resolvingPromise = accountOptions.setFlag(carl.secret(), 1)
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            }).catch((error) => {
                console.log(error)
                expect(1).to.equal(4)
                done()
            })
        }).timeout(30000)
    })
})
    step('Clear Flag ', () => {
        describe('StellarBurrito test',function (){
        it('accountOptions.clearFlags', (done) => {
            const resolvingPromise = accountOptions.clearFlag(carl.secret(), 1)
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
                .catch((error) => {
                    console.log(error)
                    expect(1).to.equal(4)
                    done()
                })
        }).timeout(30000)
    })
})
    step('Set HomeDomain ', () => {
        describe('StellarBurrito test',function (){
        it('accountOptions.setHomeDomain', (done) => {
            const resolvingPromise = accountOptions.setHomeDomain(alice.secret(), 'stellar.burrito')
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
                .catch((error) => {
                    console.log(error)
                    expect(1).to.equal(4)
                    done()
                })
        }).timeout(30000)
    })
})
    step('Set InflationDestination ', () => {
        describe('StellarBurrito test',function (){
        it('accountOptions.setInflationDestination', (done) => {
            const resolvingPromise = accountOptions.setInlationDestination(alice.secret(), bob.publicKey())
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
        }).timeout(30000)
    })
})
    step('Set Master Weight ', () => {
        describe('StellarBurrito test',function (){
        it('accountOptions.setMasterWeight', (done) => {
            const resolvingPromise = accountOptions.setMasterWeight(alice.secret(), '230')
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
                .catch((error) => {
                    console.log(error)
                    expect(1).to.equal(4)
                    done()
                })
        }).timeout(30000)
    })
})
    step('Set Low Threshold ', () => {
        describe('StellarBurrito test',function (){
        it('accountOptions.setLowThreshold', (done) => {
            const resolvingPromise = accountOptions.setLowThreshold(alice.secret(), '50')
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
                .catch((error) => {
                    console.log(error)
                    expect(1).to.equal(4)
                    done()
                })
        }).timeout(30000)
    })
})
    step('Set Medium Threshold ', () => {
        describe('StellarBurrito test',function (){
        it('accountOptions.setMediumThreshold', (done) => {
            const resolvingPromise = accountOptions.setMediumThreshold(alice.secret(), '50')
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            })
                .catch((error) => {
                    console.log(error)
                    expect(1).to.equal(4)
                    done()
                })
        }).timeout(30000)
    })
})
    step('Set High Threshold ', () => {
        describe('StellarBurrito test',function (){
        it('accountOptions.setHighThreshold', (done) => {
            const resolvingPromise = accountOptions.setHighThreshold(alice.secret(), '50')
            resolvingPromise.then((result) => {
                expect(1).to.equal(1);
                done();
            }).catch((error) => {
                console.log(error)
                expect(1).to.equal(4)
                done()
            })
        }).timeout(30000)
    })
})

