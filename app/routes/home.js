module.exports = function(application){
    application.get('/', (req,res)=> {
       application.app.controllers.home.index(application,req,res);
    });
}
