var ao=require( './stellarburrito/lib/accountOperations.js')
var pay=require('./stellarburrito/lib/paymentOperations.js')
var assetop=require('./stellarburrito/lib/assetOperations.js')
let dest=['GDZKL2BWHMGBDBPPHZGQ4RQNQBT52U266BM6TODZLWAUNNIWC43ZODJQ','GB7LEV7ZBSRW5WEJ5NYCDAHK3VFH2QKP5SBZEV3SQNCVFX7TKSET2GDV']
let distributor='SCNIYIP6WLTJYOXBQVAWQQJMYIXIIAGFKEJDAZPY4T5FUZL2OODV5PNR'
let issuer='SCYTGAZEMS4Y3EUX2DBAKQPVX6AK4N6OMIKJQXYCRFC573DAECWLFYYY'
/*var aus=issuer
issuer=source
source=aus*/
assetop.createAsset(issuer,distributor,'42342','tefinale')
                .then(function (sku){
                    console.log('andato bene')
                })
                .catch(function (sku){

                    console.log('andata male'+ sku)

                })
/*
ao.changeTrust('SDZNA6DLCNXAUWOYZJV3P3X4FU7EKFINN6NISJLG3WXZMMX3MAOKOB5T','GCNSGHUCG5VMGLT5RIYYZSO7VQULQKAJ62QA33DBC5PPBSO57LFWVV6P','BTC',"5020",'text','eskereeeee','testnet')
.then(function (sku){
    console.log(sku)
    ao.createAccount('SDZNA6DLCNXAUWOYZJV3P3X4FU7EKFINN6NISJLG3WXZMMX3MAOKOB5T','text','meno male','1.9234567','text','ha funzionatoooooo','GCNSGHUCG5VMGLT5RIYYZSO7VQULQKAJ62QA33DBC5PPBSO57LFWVV6P','BTC',"5020")
    .then(function (sku){
        console.log(sku)
        let issuerpub=sku.publicKey
         let issuer=sku.privateKey
        pay.Pay(source,dest,"100")
        .then(function (sku){
            console.log("TRY TO CHANGE TRUST \n\r "+ sku)
            let sourcepubkey='GCLNXIEAVJLQRIUOAE44IV5TFHHVS6Z6K45J43FJ2SWBKH2DUJO2QA6S'
            ao.changeTrust(source,issuerpub,'nass','1')
            .then(function (sku){
                console.log('trusted'+issuer)
                console.log(sourcepubkey + "<------ lui")
            })
            .catch(function(err){
                console.log(err)
            })
        })
        .catch(function(err){
            console.log(err)
        })
    })
    .catch(function(err){
        console.log(err)
    })
})
.catch(function(err){
    console.log(err)
})*/