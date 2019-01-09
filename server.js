var app = require('./app');
var port = process.env.PORT || 4000;

var server = app.listen(port, function() {
  console.log(' #####################################################TODUBA SYSTEM ONLINE##################################################### ' + port);
});

/**** CONNESSIONE MYSQL***********/
