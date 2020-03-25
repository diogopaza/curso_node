var ObjectID = require('mongodb').ObjectID;

function JogoDAO(connection){
    this._connection = connection();
    dbname="gotTeste";
}

JogoDAO.prototype.gerarParametros = function(usuario){
    var result;
    var error = this._connection.connect(function(err, client){
        if (err){
            console.log("erro local", err)            
            return
        } 
        console.log("Connected correctly to server");      
        const db = client.db(dbname);      
        db.collection('jogo').insert({
            usuario:usuario,
            moeda:15,
            suditos:10,
            temor: Math.floor(Math.random() * 1000),
            sabedoria: Math.floor(Math.random() * 1000),
            comercio: Math.floor(Math.random() * 1000),
            magia: Math.floor(Math.random() * 1000)
        }, function(err,result){
            if(err){  
                console.log("err: ", err)              
                return
            }
        })       
    })    
}
JogoDAO.prototype.iniciaJogo = function(res,usuario,casa,comando){
    this._connection.connect(function(err, client) {
        //assert.equal(null, err);
        if(err){
            console.log("ERRO")
            return 
        }
        const db = client.db(dbname);          
        db.collection('jogo').find({usuario: {$eq: usuario} })
            .toArray(function(err, result){
                res.render('jogo',{img_casa: casa, jogo: result[0],comando: comando});
        })          
        client.close();    
    })
}
JogoDAO.prototype.acao = function(acao){
    var error = this._connection.connect(function(err, client){
        if (err){
            console.log("erro local", err)            
            return
        } 
        var date = new Date();
        tempo = null
        console.log("acao", acao.acao)
        switch(parseInt(acao.acao)){
            case 1:
                     tempo =  1 * 60 * 60000; 
                     break;
            case 2: tempo = 2 * 60 * 60000; break;
            case 3: tempo = 5 * 60 * 60000; break;
            case 4: tempo = 5 * 60 * 60000; break;
            
        }        
        data_miliegundos = date.getTime()
        acao.acao_termina_em = date.getTime() + tempo
        const db = client.db(dbname);      
        db.collection('acao').insert(acao, function(err,result){
            if(err){  
                console.log("err: ", err)              
                return
            }
        })   
        var moedas =null;
        switch(parseInt(acao.acao)){
            case 1: moedas = -2 * acao.quantidade; break;            
            case 2: moedas = -3 * acao.quantidade; break;
            case 3: moedas = -1 * acao.quantidade; break;
            case 4: moedas = -1 * acao.quantidade; break;            
        }  

        db.collection('jogo').update({usuario:acao.usuario},{$inc:{moeda:moedas}}, function(err,result){
            if(err){  
                console.log("err: ", err)              
                return
            }
        })       
    })    
}
JogoDAO.prototype.getAcoes = function(usuario,res){
    this._connection.connect(function(err, client) {
        //assert.equal(null, err);
        if(err){
            console.log("ERRO")
            return 
        }
        var date = new Date();
        momento_atual = date.getTime();
        const db = client.db(dbname);  
        db.collection('acao').find({usuario: {$eq: usuario}, acao_termina_em:{$gt:momento_atual}})
            .toArray(function(err, result){
                res.render('pergaminhos', {acoes:result });
        })          
        client.close();    
    })

}
JogoDAO.prototype.revogar_acao = function(_id,res){
    this._connection.connect(function(err, client) {
        //assert.equal(null, err);
        if(err){
            console.log("ERRO")
            return 
        } 
        const db = client.db(dbname);          
        db.collection('acao').remove({_id: ObjectID(_id)}, function(err,result){
            if(err){  
                console.log("err: ", err)              
                return
            }
            res.redirect('jogo?comando=D')
        })           
        client.close();    
    })
}

module.exports = function(){
    return JogoDAO;
}