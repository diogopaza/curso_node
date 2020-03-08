var {check}  = require('express-validator');

module.exports = function(application){
    application.post('/chat', [
        check('apelido','Apelido é obrigatorio').notEmpty()
    ],function(req,res){
        application.app.controllers.chat.iniciaChat(application,req,res);
    })

    application.get('/chat', function(req,res){
        application.app.controllers.chat.iniciaChat(application,req,res);
    })
}