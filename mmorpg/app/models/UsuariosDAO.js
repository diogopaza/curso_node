function UsuariosDAO(connection){
    this._connection = connection();    
    dbname="gotTeste"
}

const assert = require('assert');

UsuariosDAO.prototype.inserirUsuario = function(usuario){
    var result;
    var error = this._connection.connect(function(err, client){
        if (err){
            console.log("erro local", err)            
            return
        } 
        console.log("Connected correctly to server");      
        const db = client.db(dbname);      
        db.collection('usuarios').insert(usuario, function(err,result){
            if(err){  
                console.log("err: ", err)              
                return
            }
        })       
    })    
}
UsuariosDAO.prototype.autenticar = function(usuario,req,res){
    this._connection.connect(function(err, client) {
        //assert.equal(null, err);
        if(err){
            console.log("ERRO")
            return 
        }
        const db = client.db(dbname);  
        db.collection('usuarios').find({usuario: {$eq: usuario.usuario}, 
            password: {$eq: usuario.password } }).toArray(function(err, result){
            if(result[0] != undefined){
                req.session.autorizado = true;
                req.session.usuario = result[0].usuario;
                req.session.casa = result[0].casa;
            } 
            if(req.session.autorizado){
                res.redirect("jogo");
            }else{
                res.render("index",{validacao:{}});
            }        
        })          
        client.close();    
    })
}
module.exports = function(){
    return UsuariosDAO;
}

