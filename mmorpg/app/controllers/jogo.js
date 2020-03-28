module.exports.jogo = function(app, req, res){
    if(req.session.autorizado !== true){
        res.send("Usuário precisa fazer login");
        return;        
    }   
    var comando = '';
    if(req.query.comando == 'A'){
        comando =  "A";
    }
    if(req.query.comando == 'B'){
        comando =  "B";
    }
    if(req.query.comando == 'D'){
        comando =  "D";
    }
    var casa = req.session.casa;
    var connection = app.config.dbConnection;
    var JogoDAO = new app.app.models.JogoDAO(connection);
    JogoDAO.iniciaJogo(res,req.session.usuario,casa,comando);    
}
module.exports.sair = function(app, req, res){
    req.session.destroy( function(err){
        res.render('index', {validacao:{}, login:{} });
    });
   
}
module.exports.suditos = function(app, req, res){
    if(req.session.autorizado !== true){
        res.send("Usuário precisa fazer login");
        return;           
    }
    //recuperar ações inseridas no banco de dados
    //renderizar na view pergaminhos



    res.render('aldeoes', {validacao:{} });
}

module.exports.pergaminhos = function(app, req, res){
    if(req.session.autorizado !== true){
        res.send("Usuário precisa fazer login");
        return;           
    }
    usuario = req.session.usuario
    var connection = app.config.dbConnection;
    var JogoDAO = new app.app.models.JogoDAO(connection);
    JogoDAO.getAcoes(usuario,res);
    
       
}

module.exports.ordenar_acao_sudito = function(app, req, res){
    var dadosForm = req.body;
    req.assert('acao', 'Ação deve ser informada').notEmpty();
    req.assert('quantidade', 'Quantidade deve ser informada').notEmpty();

    var erros = req.validationErrors();
    if(erros){
        res.redirect('jogo?comando=A');
        return;
    }
    var connection = app.config.dbConnection;
    var JogoDAO = new app.app.models.JogoDAO(connection);
    dadosForm.usuario = req.session.usuario;
    JogoDAO.acao(dadosForm);  
    res.redirect('jogo?comando=B');
}
module.exports.revogar_acao = function(app, req, res){
    var url_query = req.query;
    var _id = url_query.id_acao; 
    var connection = app.config.dbConnection;
    var JogoDAO = new app.app.models.JogoDAO(connection);
    JogoDAO.revogar_acao(_id,res);  
}