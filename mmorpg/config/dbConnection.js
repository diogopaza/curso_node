const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

var mongoDB = function(){
    var db;
    const url = 'mongodb://localhost:27017';    
    const client = new MongoClient(url);  
    return client;  
}

module.exports = function(){    
    return mongoDB;
}