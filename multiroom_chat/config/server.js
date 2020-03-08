/*importar o modulos*/
var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');

var application = express();

/*setar as variaveis ''view engine e 'views' do express*/ 
application.set('view engine', 'ejs');
application.set('views', './app/views');

/*middleware*/
application.use(express.static('./app/public')); 
application.use(bodyParser.urlencoded({extended:true}));

consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(application)

module.exports = application;