var ao = require('./stellarburrito/accountOperations.js')
var pay = require('./stellarburrito/paymentOperations.js')
var assetop = require('./stellarburrito/assetOperations.js')
let dest = ['GDZKL2BWHMGBDBPPHZGQ4RQNQBT52U266BM6TODZLWAUNNIWC43ZODJQ', 'GB7LEV7ZBSRW5WEJ5NYCDAHK3VFH2QKP5SBZEV3SQNCVFX7TKSET2GDV']
let distributor = 'SCNIYIP6WLTJYOXBQVAWQQJMYIXIIAGFKEJDAZPY4T5FUZL2OODV5PNR'
let issuer = 'SCYTGAZEMS4Y3EUX2DBAKQPVX6AK4N6OMIKJQXYCRFC573DAECWLFYYY'
let hi = require('./stellarburrito/history.js')
let le = require('./stellarburrito/ledger.js')
let oo = require('./stellarburrito/offerOperations')
let as = require('./stellarburrito/accountStatus')
let aop = require('./stellarburrito/accountOptions')
/*var aus=issuer
issuer=source SAATOSTIWQNLY46SRHGTNJ2NBYAF7YL2BPFLD7ZHZOGUJVR3KOYLUF7T
source=aus*/
let sb = require('./stellarburrito/StellarBurrito')
let distributorPair = sb.StellarSdk.Keypair.fromSecret(distributor)
let issuerPair = sb.StellarSdk.Keypair.fromSecret(issuer)

async function f1() {
        console.log(distributorPair.publicKey())
        /*as.getAccountStreams('GDMMPWQCUG6MFF3DTCRBWVXQO5RWHPIQBQWCIUNJF2LAJJQFU24NMTJB')
        pay.Pay(distributor, issuerPair.publicKey(), '1')
                .then(res => {
                        console.log(res)
                })*/
                console.log(await ao.manageData(distributor,'test','testt')+' '+distributorPair.publicKey())
      //  console.log(await hi.paymentsHistory('GDMMPWQCUG6MFF3DTCRBWVXQO5RWHPIQBQWCIUNJF2LAJJQFU24NMTJB'))
}
f1()