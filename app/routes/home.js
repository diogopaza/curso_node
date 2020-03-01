module.exports = function(application){
    application.get('/', (req,res)=> {
        res.render('home/index')
    });
}
