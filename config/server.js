var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var {check, validationResult}  = require('express-validator');
var application = express();

application.set('view engine', 'ejs');
application.set('views', './app/views');

application.use(bodyParser.urlencoded({extended:true}));
application.use(check());

consign()
    .include('app/routes')
    .then('config/dbConnection.js')
    .then('app/models')
    .into(application);
module.exports = application;