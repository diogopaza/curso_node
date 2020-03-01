function Noticias(conn){
    this._conn = conn;
}

Noticias.prototype.getNoticias = function(callback){
    this._conn.query('SELECT * FROM noticias', callback); 
 }   

 Noticias.prototype.getNoticia = function(callback){
    this._conn.query('SELECT * FROM noticias WHERE id_noticia = 1', callback);
}

Noticias.prototype.salvarNoticia = function(noticia, callback){
    this._conn.query('INSERT INTO noticias set ?',noticia, callback);
}

module.exports = function(){
    return Noticias;
}

