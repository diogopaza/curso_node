module.exports.index = function(app, req, res){
    res.render('index', {validacao:{}, dadosForm: {}, login: {}});
}
module.exports.autenticar = function(app, req, res){
    var dadosForm = req.body;
    req.assert('usuario', 'Usuario não pode ser vazio').notEmpty();
    req.assert('password', 'Senha não pode ser vazio').notEmpty();

    erros = req.validationErrors()
    if(erros){
        res.render('index', {validacao:erros, dadosForm: dadosForm, login:{}} )
        return;
    }   
    var connection = app.config.dbConnection;
    var UsuariosDAO = new app.app.models.UsuariosDAO(connection);
    UsuariosDAO.autenticar(dadosForm,req,res)
   
    //res.send('tudo ok para criar a sessao');
}

