var ao = require('./stellarburrito/accountOperations.js')
var pay = require('./stellarburrito/paymentOperations')
var assetop = require('./stellarburrito/assetOperations.js')
let dest = ['GDZKL2BWHMGBDBPPHZGQ4RQNQBT52U266BM6TODZLWAUNNIWC43ZODJQ', 'GB7LEV7ZBSRW5WEJ5NYCDAHK3VFH2QKP5SBZEV3SQNCVFX7TKSET2GDV']
let distributor = 'SCNIYIP6WLTJYOXBQVAWQQJMYIXIIAGFKEJDAZPY4T5FUZL2OODV5PNR'
let issuer = 'SCYTGAZEMS4Y3EUX2DBAKQPVX6AK4N6OMIKJQXYCRFC573DAECWLFYYY'
let hi = require('./stellarburrito/history.js')
let le = require('./stellarburrito/ledger.js')
let oo = require('./stellarburrito/offerOperations')
let as = require('./stellarburrito/accountStatus')
let aop = require('./stellarburrito/accountOptions')
let obx = require('./stellarburrito/orderbook')

let Account = require('./stellarburrito/account')
/*var aus=issuer
issuer=source SAATOSTIWQNLY46SRHGTNJ2NBYAF7YL2BPFLD7ZHZOGUJVR3KOYLUF7T
source=aus*/
let sb = require('./stellarburrito/StellarBurrito')
let distributorPair = sb.StellarSdk.Keypair.fromSecret(distributor)
let issuerPair = sb.StellarSdk.Keypair.fromSecret(issuer)
let utente = 'SAIHFII5T2BVTM4FHZO7AJADSH3LOTCB2IM3ZIE5NB6ERZ6ITR3NSGYG'
let referto = 'SBA2UF6QKW2AZVDURNUOHGYPQ7TZCND5LJHXQZYOONJC6WOS65LDNLCU'
let refertoPair = sb.StellarSdk.Keypair.fromSecret(referto)
let utentePair = sb.StellarSdk.Keypair.fromSecret(utente)
let Fee = require('./stellarburrito/fee')
async function f1() {
 
}
f1()
