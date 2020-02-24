var server = http.createServer(function(req, res){

    var categoria = req.url
    console.log("categoria: " + categoria)
    if(categoria == '/tecnologia'){
        res.end("<h1>Noticias de tecnologia</h1>")
    }
    if(categoria == '/moda'){
        res.end("<h1>Noticias de moda</h1>")
    }
    if(categoria == '/beleza'){
        res.end("<h1>Noticias de beleza</h1>")
    }else{
        res.end("<h1>Servidor Rodando</h1>")
    }
   
});

server.listen(3000);



