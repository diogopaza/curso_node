var {validationResult}  = require('express-validator');

module.exports.formulario_inclusao_noticia = function(application,req,res){
    res.render('administrativo/form_add_noticia', {validacao:{}, noticia:{} })
}

module.exports.noticias_salvar = function(application,req,res){
        noticia = req.body;
        erros =  validationResult(req);
        if(!erros.isEmpty()){
            res.render('administrativo/form_add_noticia', {validacao: erros.array(), noticia: noticia})
            return;
        }        
        var connection = application.config.dbConnection();
        var NoticiasDAO = new application.app.models.NoticiasDAO(connection);
        NoticiasDAO.salvarNoticia(noticia,()=>{
           res.redirect('/noticias'); 
        })
          
}    

    

    
