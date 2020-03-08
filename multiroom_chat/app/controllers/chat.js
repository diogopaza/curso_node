var {validationResult}  = require('express-validator');

module.exports.iniciaChat = function(application,req,res){
    var dadosForm = req.body;
    console.log('dadosForm ', dadosForm)
    erros =  validationResult(req);
        if(!erros.isEmpty()){
            res.render('index',{validacao: erros.array()});
            return;
        }    
    application.get('io').emit(
        'msgParaCliente',
        {apelido: dadosForm.apelido, mensagem:'acabou de entrar no chat'}
    );
    res.render('chat', {dadosForm:dadosForm});
}