const accountOperations = require('../accountOperations')
const accountStatus = require('../accountStatus')
const Account = require('../account')
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
let accountTrust = 'SC4P7ENIMJEFH5EHLEXFCMWC2YEYEZFVBPMLWG7AATL2SL5CYO55QAPI'
let alice = StellarSdk.Keypair.fromSecret(accountTrust)
let accountDistributor = config.testaccount
let bob = StellarSdk.Keypair.fromSecret(accountDistributor)
let distributor = 'SBZ54FCSTAYQGTFU3GDADJBEEYVYLF35AYXGEUDJL7OJZS6QJGPDQ3L3'
let issuer = 'SD3SX3RCEHC7QRBIYPMBEYZDV4GOZVTPBUECVR6DZFHKZTWQA3JG7DEO'
let distributorPair = StellarSdk.Keypair.fromSecret(distributor)
let issuerPair = StellarSdk.Keypair.fromSecret(issuer)
let carl = StellarSdk.Keypair.fromSecret('SDL4UJZSKVUKUMSDQ6UQ4BBS6FEEMDUSMBPTN2ISDXTUU3NMDCMURN33')
let donald = StellarSdk.Keypair.fromSecret('SB3N6S2HZFC4NEPP25XYYBHNX7QUPBVJE76TWM4Z6NL72XWMZTL26THG')
let privKeyCreate;
let asset = ""
let testaccount=new Account(config.testaccount)
let aliceAccount= new Account(alice.secret())
let bobAccount= new Account(bob.secret())
let carlAccount=new Account(carl.secret())
let donaldAccount = new Account(donald.secret())
console.log( donaldAccount.publicKey)
function random() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 12; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}
    step('Create new account', () => {
        describe('Create new account',function (){
        it('Account.createAccount', (done) => {
            let resolvingPromise =  testaccount.createAccount()
            resolvingPromise.then((result) => {
                privKeyCreate = new Account(result.privateKey)
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
        describe('Change Trust',function (){
        it('Account.changeTrust', (done) => {
            const resolvingPromise = aliceAccount.changeTrust('GDDOYLS5X52UTIUKVX2CDLEI4OF5YIBB4SE4MDPWRTGS7W23ZZLVKWTJ','qY3g1IyY7qUW','100000000')
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
        describe('Manage data',function (){
        it('Account.manageData', (done) => {
           aliceAccount.manageData('stellar', 'burrito')
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
        it('Account.mergeAccount', (done) => {
            const resolvingPromise = privKeyCreate.mergeAccount(aliceAccount) 
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
    aliceAccount.createPassiveOffer()
    step('Create new asset', () => {
        describe('Create New Asset',function (){
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
            const resolvingPromise = carlAccount.Pay({destination:donald.publicKey(), amount:'0.000001'})
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
            const resolvingPromise = aliceAccount.getPayments()
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
            const resolvingPromise =aliceAccount.getTransactions()
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
            const resolvingPromise = donaldAccount.createPassiveOffer()
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
            const resolvingPromise = donaldAccount.manageOffer()
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
            const resolvingPromise = aliceAccount.Load()
            resolvingPromise.then((result) => {
                console.log(aliceAccount)
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
            const resolvingPromise = aliceAccount.Load()
            resolvingPromise.then((result) => {
                console.log(aliceAccount.flags)
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
            const resolvingPromise = aliceAccount.Load()
            resolvingPromise.then((result) => {
                console.log(aliceAccount.home_domain)
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
            const resolvingPromise = aliceAccount.Load()
            resolvingPromise.then((result) => {
                console.log(aliceAccount.inflation_destination)
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
        it('accountStatus.getSigners', (done) => {
            const resolvingPromise = aliceAccount.Load()
            resolvingPromise.then((result) => {
                console.log(aliceAccount.signers)
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
            const resolvingPromise = aliceAccount.Load()
            resolvingPromise.then((result) => {
                console.log(aliceAccount.thresholds)
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
        it('accountStatus.getTrustlines', (done) => {
            const resolvingPromise = aliceAccount.Load()
            resolvingPromise.then((result) => {
                console.log(aliceAccount.trustlines)
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
            const resolvingPromise = aliceAccount.Load()
            resolvingPromise.then((result) => {
                console.log(aliceAccount.sequence)
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
            const resolvingPromise = carlAccount.setFlag('1')
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
            const resolvingPromise = carlAccount.clearFlag('2')
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
            const resolvingPromise = aliceAccount.setHomeDomain('StellarBurrito')
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
            const resolvingPromise = aliceAccount.setInlationDestination(bobAccount)
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
            const resolvingPromise = aliceAccount.setMasterWeight(240)
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
            const resolvingPromise = aliceAccount.setLowThreshold(50)
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
            const resolvingPromise = aliceAccount.setMediumThreshold(50)
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
            const resolvingPromise = aliceAccount.setHighThreshold(50)
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

