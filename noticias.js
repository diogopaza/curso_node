var http = require('http');

var server = http.createServer(function(req, res){
    res.end("<h1>Servidor Rodando</h1>")
});

server.listen(3000);



