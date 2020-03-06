module.exports.index = function(application,req,res){
    console.log("cheguei home controller")
    var connection = application.config.dbConnection();
    var noticiasModel = new application.app.models.NoticiasDAO(connection);
    noticiasModel.get5UltimasNoticias(function(error, result){
        if(error){
            return
        }
        res.render('home/index',{noticias: result});
    });
    
}