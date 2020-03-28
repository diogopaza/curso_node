crypto = require('crypto');

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
        var senhaCriptografada = crypto.createHash("md5").update(usuario.password).digest("hex");      
        usuario.password = senhaCriptografada;
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
        if(err){
            console.log("ERRO")
            return 
        }
        const db = client.db(dbname); 
        var senhaCriptografada = crypto.createHash("md5").update(usuario.password).digest("hex");      
        db.collection('usuarios').find({usuario: {$eq: usuario.usuario}, 
            password: {$eq: senhaCriptografada } }).toArray(function(err, result){
            if(result[0] != undefined){
                req.session.autorizado = true;
                req.session.usuario = result[0].usuario;
                req.session.casa = result[0].casa;
            } 
            if(req.session.autorizado){
                res.redirect("jogo");
            }else{
                login = 'A';
                res.render('index', {validacao:{}, dadosForm: usuario, login: login});
                //res.redirect('/?login=A');                
                //res.render("index",validacao=validacao);
            }        
        })          
        client.close();    
    })
}
module.exports = function(){
    return UsuariosDAO;
}

