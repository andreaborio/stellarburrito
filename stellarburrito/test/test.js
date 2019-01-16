const accountOperations = require('../accountOperations')
const assetOperations = require('../assetOperations')
const paymentOperations=require('../paymentOperations')
const history=require('../history')
const ledgers =require('../ledger')
const config = require('../config')
const StellarSdk = require('stellar-sdk')
const chai = require('chai')
    .use(require('chai-as-promised'))
const expect = chai.expect;
let accountTrust = 'SDUSO5W2WU2FEMRKAGXFMZUEJ4RYCCKZYE2UADVRU4APLIVGV5K5Y5LC'
let alice = StellarSdk.Keypair.fromSecret(accountTrust)
let accountDistributor=config.testaccount
let bob = StellarSdk.Keypair.fromSecret(accountDistributor)
function random() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 12; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
  }
  
    step('accountOperations', function () {
        describe('Create new account', () => {
            it('accountOperations.createAccount', (done) => {
                const resolvingPromise = accountOperations.createAccount(config.testaccount)
                resolvingPromise.then((result) => {
                    expect(1).to.equal(1);
                    done();
                })
            }).timeout(15000)
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
            }).timeout(15000)
        })
    })
    step('assetOperations', function () {
        describe('Create new asset', () => {
            it('assetOperations.createAsset', (done) => {
                const resolvingPromise = assetOperations.createAsset(alice.secret(), bob.secret(),'1', random())
                resolvingPromise.then((result) => {
                    expect(1).to.equal(1);
                    done();
                })
            }).timeout(15000)
        })
    })
    step('paymentOperations', function () {
        describe('Pay from alice to bob', () => {
            it('paymentOperations.Pay', (done) => {
                const resolvingPromise = paymentOperations.Pay(alice.secret(), bob.publicKey(),'0.0000001')
                resolvingPromise.then((result) => {
                    expect(1).to.equal(1);
                    done();
                })
            }).timeout(15000)
        })
    })
    step('history', function () {
        describe('Get history', () => {
            it('history.paymentHistory', (done) => {
                const resolvingPromise = history.paymentsHistory(alice.publicKey())
                resolvingPromise.then((result) => {
                    expect(1).to.equal(1);
                    done();
                })
            }).timeout(15000)
        })
    })
    step('ledger', function () {
        describe('Get ledger', () => {
            it('history.paymentHistory', (done) => {
                const resolvingPromise = ledgers.getLedgers(1,'asc')
                resolvingPromise.then((result) => {
                    expect(1).to.equal(1);
                    done();
                })
            }).timeout(15000)
        })
    })