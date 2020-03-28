var http = require('http');
var buffer_corpo_response = [];
var opcoes = {
    hostname:'localhost',
    port: 3000,
    path:'/teste',
    method:'get',
    headers:{
        'Accept':'application/json',
        'Content-type':'application/json'
    }
}
/*
//Content-type
//x-www-form-urlenconded
var html = 'nome=Jose';
var json = {
    nome: 'Jose Json'
}
var string_json = JSON.stringify(json);
*/
var req = http.request(opcoes, (res)=>{
    res.on('data', (pedaco)=>{
        buffer_corpo_response.push(pedaco);
    });

    res.on('end', ()=>{
        var corpoResponse=Buffer.concat(buffer_corpo_response).toString();
        console.log(corpoResponse);
        console.log(res.statusCode);
    })
    res.on('error',()=>{

    })
})
//req.write(string_json);
req.end();