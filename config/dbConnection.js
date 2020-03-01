var mysql = require('mysql');

var connMysql =  function(){
    console.log("conexao com o banco foi estabelecida");
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123',
        database: 'portal_noticias'
     });
}
module.exports = function(){
    console.log('o autoload carregou o modulo')
    return connMysql;
}
   



       