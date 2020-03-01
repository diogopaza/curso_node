module.exports = function(application){
    application.get('/formulario_inclusao_noticia', (req,res)=> {
        res.render('admin/form_add_noticia')
    });

    application.post('/noticias/salvar', (req,res)=> {
        var noticia = req.body;
        var connection = application.config.dbConnection();
        var NoticiasDAO = new application.app.models.NoticiasDAO(connection);
        
        NoticiasDAO.salvarNoticia(noticia,function(err, result){
            if(err){
                return res.status(500).send(err);
            }
                res.redirect('/noticias');
        })
    });
}