module.exports = function(application){
	application.get('/', function(req, res){
		
		res.render('xyz');
		/*
		res.format({
			html: ()=>{
				res.send('Bem vindo a sua app NodeJS!');
			},
			json: ()=>{
				var retorno = {
					body:'Bem vindo a sua app NodeJS!'
				}
				res.json(retorno);
			}
		})
		*/
	});
	application.post('/', function(req, res){
		dados = req.body;
		res.send(dados);
	});
}