var http = require('http');
var fs =  require('fs');

var server  = http.createServer((req,res) => {
    res.end("<b> Client request received </b>");

});

server.listen(8000);
