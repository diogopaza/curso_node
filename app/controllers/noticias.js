module.exports.noticias = function(application,req,res){
    var connection = application.config.dbConnection();
    var NoticiasDAO = new application.app.models.NoticiasDAO(connection);    
    NoticiasDAO.getNoticias(function(err, result){
        if(err){
            return res.status(500).send(err);
        }
            res.render('noticias/noticias', {noticias: result});
    })   
}
module.exports.noticia = function(application,req,res){
    var connection = application.config.dbConnection();
    var NoticiasDAO = new application.app.models.NoticiasDAO(connection);
    var id_noticia = req.query;
    NoticiasDAO.getNoticia(id_noticia,function(err, result){
        if(err){
           return res.status(500).send(err);
        }
        res.render('noticias/noticia', {noticia: result});        
    })  
}