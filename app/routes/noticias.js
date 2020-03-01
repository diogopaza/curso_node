//connection = require('../../config/dbConnection')();
module.exports = function(application){
    application.get('/noticias', (req,res)=> {
        var connection = application.config.dbConnection();
        var NoticiasDAO = new application.app.models.NoticiasDAO(connection);
        
        NoticiasDAO.getNoticias(function(err, result){
            if(err){
                return res.status(500).send(err);
            }
                res.render('noticias/noticias', {noticias: result});
        })       
    });   
}
