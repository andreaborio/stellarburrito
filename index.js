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

let account = require('./stellarburrito/account')
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
async function f1() {
 // console.log(JSON.stringify(await obx.getOrderbook('BTC','GCNSGHUCG5VMGLT5RIYYZSO7VQULQKAJ62QA33DBC5PPBSO57LFWVV6P')))
  //console.log(JSON.stringify(await assetop.getAssets(1,200)))
  try{
    let user= new account()
    await user.load('SAIHFII5T2BVTM4FHZO7AJADSH3LOTCB2IM3ZIE5NB6ERZ6ITR3NSGYG')
    console.log(user.balances)
    console.log(await user.getPayments())
    console.log(await user.getTransactions(1))
    console.log(await user.inflation_destination)
  
  }
  catch(error){
    console.log(error)
  }


  /* try {


    let ciao = await ao.changeTrust(distributor, 'GDRBK5RZFLBDQYJNJF2X4VMJ6RE4OTESND6KABIJRLFVO5MNYU6VNKF7', 'jjjjjjj', '300000000000021321')
    console.log(ciao)
  }
  catch (error) {
    console.log(error)
  }*/
}
f1()
/*
refertoPair.publicKey()
console.log('DECIFRATURA IN CORSO')
let result = await pay.Pay(referto,utentePair.publicKey(),'1','native','native',15,'text','refertodecifrato')
console.log('DECIFRATO')
const balance= await as.getBalances(refertoPair.publicKey())
console.log('SETTO HASH FILE REFERTO IN DATI UTENTE       ->Cifratura in corso')
data=await ao.manageData(utentePair.secret(),'ref1','aGFzaGZpbVyZWZlcnRv')
console.log('FILE SALVATO        -> Documento cifrato')
try{
  console.log(balance.balances[0].balance)
let esult = await pay.Pay(referto,utentePair.publicKey(),balance.balances[0].balance.toString(),'native','native',15)
}
catch(error){
  console.log(error)
}
console.log('Chiusura Account referto in corso...')
/
let res = await ao.mergeAccount(refertoPair.secret(),utentePair.publicKey())/*
console.log('Account referto Chiuso.')

console.log(res)
//Radiografia 1  SBA2UF6QKW2AZVDURNUOHGYPQ7TZCND5LJHXQZYOONJC   6WOS65LDNLCU
u1 p1
//radiografia 2
u2 P2
// user1
user1 pass1         SAIHFII5T2BVTM4FHZO7AJADSH3LOTCB2IM3ZIE5NB6E  RZ6ITR3NSGYG
-> agg referto
    u1 p1
      -> referti dispobinibili
            rdx rsx
      Aggiungi
                                ->        u1->user1
      - r1 -> decifrare referto ->   referto decifrato  -> user1        -> ricifri->
                p' + p1                                     p''+pass1




R1 -> u1 p1     Rc1 p1'
R2 -> u2 p2     Rc2 p2'
Accedi al ....., crea il tuo account (se non ce l'hai gia) -> email, psw ->




*/