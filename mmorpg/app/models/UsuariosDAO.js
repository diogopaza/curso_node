function UsuariosDAO(connection){
    this._connection = connection();    
    dbname="gotTeste"
}

const assert = require('assert');

UsuariosDAO.prototype.inserirUsuario = function(usuario){
    this._connection.connect(function(err, client) {
        assert.equal(null, err);
        console.log("Connected correctly to server");      
        const db = client.db(dbname);      
        db.collection('usuarios').insertOne({a:usuario}, function(err, r) {
          assert.equal(null, err);
          assert.equal(1, r.insertedCount);
        })  
        client.close();    
    })
}

module.exports = function(){
    return UsuariosDAO;
}

