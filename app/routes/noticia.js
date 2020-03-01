module.exports = function(application){
    application.get('/noticia', (req,res)=> {
        var connection = application.config.dbConnection();
        var noticiaModel = new application.application.models.NoticiasDAO(connection);
       
        noticiaModel.getNoticia(connection, function(err, result){
            if(err){
                return res.status(500).send(err);
            }
                res.render('noticias/noticia', {noticia: result});
        })    
    })
}
