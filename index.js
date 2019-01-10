var ao=require( './stellarburrito/accountOperations.js')

ao.changeTrust('SDZNA6DLCNXAUWOYZJV3P3X4FU7EKFINN6NISJLG3WXZMMX3MAOKOB5T','GCNSGHUCG5VMGLT5RIYYZSO7VQULQKAJ62QA33DBC5PPBSO57LFWVV6P','BTC',"5020",'text','eskereeeee','testnet')
.then(function (sku){
    console.log(sku)
    ao.createAccount('SDZNA6DLCNXAUWOYZJV3P3X4FU7EKFINN6NISJLG3WXZMMX3MAOKOB5T','text','meno male','1.9234567','text','ha funzionatoooooo','GCNSGHUCG5VMGLT5RIYYZSO7VQULQKAJ62QA33DBC5PPBSO57LFWVV6P','BTC',"5020")
    .then(function (sku){
        console.log(sku)
    })
    .catch(function(err){
        console.log(err)
    })
})
.catch(function(err){
    console.log(err)
})