var express = require('express');
var bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
ObjectID = require('mongodb').ObjectID;

var app =express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = 3000;
var dbname = 'instagram';

app.listen(port);
var mongoDB = function(){
    const url = 'mongodb://localhost:27017';    
    const client = new MongoClient(url, function(err, result){
        if(err){
            console.log("Erro ao conectar")
            return
        }
    });  
    return client;  
}
mongo = mongoDB();

console.log("servidor esta escutando na " + port);

app.get('/', (req,res)=>{
    res.send({msg:'Olá'});
})

app.post('/api', (req,res)=>{
    var dados = req.body;
        mongoDB().connect(function(err, client){
            if (err){
                console.log("erro local", err)            
                return
            } 
            console.log("Connected correctly to server");      
            const db = client.db(dbname);      
            db.collection('postagens').insert(dados, function(err,result){
                if(err){  
                    res.json(err)             
                }else{
                    res.json(dados); 
                }
                client.close();
            })       
        })  
        
    })
    app.get('/api', (req,res)=>{
        mongoDB().connect(function(err, client){
            if (err){
                console.log("erro local", err)            
               return
            } 
            console.log("Connected correctly to server");      
            const db = client.db(dbname);      
            db.collection('postagens').find().toArray(function(err,result){
                if(err){  
                     res.json(err)             
                }else{
                    res.json(result); 
                }
                    client.close();
                })       
            })  
            
        })
        app.get('/api/:id', (req,res)=>{
            mongoDB().connect(function(err, client){
                _id = ObjectID(req.params.id)
                console.log("id: ", _id)
                if (err){
                    console.log("erro local", err)            
                   return
                } 
                console.log("Connected correctly to server");      
                const db = client.db(dbname);      
                db.collection('postagens').find(_id).toArray(function(err,result){
                    if(err){  
                         res.json(err)             
                    }else{
                        res.json(result); 
                    }
                        client.close();
                    })       
            })  
                
        })
    
    
