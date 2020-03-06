function Noticias(conn){
    this._conn = conn;
}

Noticias.prototype.getNoticias = function(callback){
    this._conn.query('SELECT * FROM noticias order by data_noticia desc', callback); 
 }   

 Noticias.prototype.getNoticia = function(id_noticia,callback){
     this._conn.query('SELECT * FROM noticias WHERE id_noticia=' + id_noticia.id_noticia, callback); 
}

Noticias.prototype.salvarNoticia = function(noticia, callback){
    this._conn.query('INSERT INTO noticias set ?',noticia, callback);
}

Noticias.prototype.get5UltimasNoticias = function(callback){
    this._conn.query('SELECT * FROM noticias order by data_criacao desc limit 5', callback);
 }

module.exports = function(){
    return Noticias;
}

