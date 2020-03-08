/*importar as configurações do servidor*/
var app = require('./config/server.js');

/*parametrizar a porta de escuta*/
var server = app.listen(3000, function(){
    console.log('servidor online')
})

var io = require('socket.io').listen(server);
/** setando variavel global dentro do objeto express */
app.set('io', io);
/*criar a conexao por websocket */
/* on fica ouvindo pedidos de execução*/ 
io.on('connection',function(socket){
    console.log("usuario conectou");
    socket.on('msgParaServidor', (data)=>{
        socket.emit(
            'msgParaCliente',
            {apelido:data.apelido, mensagem:data.mensagem}
        );
        socket.broadcast.emit(
            'msgParaCliente',
            {apelido:data.apelido, mensagem:data.mensagem}
        );
        if(parseInt(data.contador_apelido) == 0){
            socket.emit(
                'participantesParaCliente',
                {apelido:data.apelido}  
            );
            
            socket.broadcast.emit(
                'participantesParaCliente',
                {apelido:data.apelido}                
            );
        }       
    });
    
});



