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
    console.log('noticia get')
    var connection = application.config.dbConnection();
    var NoticiasDAO = new application.app.models.NoticiasDAO(connection);
    NoticiasDAO.getNoticia(connection, function(err, result){
        if(err){
            console.log("deu erro no callback"); 
            return res.status(500).send(err);
        }
        console.log("to noticia"); 
        //res.render('noticias/noticia', {noticia: result});
        res.render('noticias/noticias', {noticias: result});
    })  
}