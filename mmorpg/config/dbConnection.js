const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var mongoDB = function(){
    var db;
    const url = 'mongodb://localhost:27017';    
    const client = new MongoClient(url, function(err, result){
        if(err){
            console.log("Erro ao conectar")
            return
        }
    });  
    return client;  
}

module.exports = function(){    
    return mongoDB;
}