var {check}  = require('express-validator');

module.exports = function(application){    
    application.get('/formulario_inclusao_noticia', (req,res)=> {
        application.app.controllers.admin.formulario_inclusao_noticia(application,req,res);
    });

    application.post('/noticias/salvar',[
        check('titulo','Título é obrigatorio').notEmpty(),
        check('resumo',' Resumo deve conter entre 10 e 100 caracteres').isLength({min:5}),
        check('autor','Autor é obrigatorio').notEmpty(),
        check('data_noticia','Data é obrigatorio').isISO8601('YYYY-MM-DD'),
        check('noticia','Noticia é obrigatoria').notEmpty()
    ],(req,res)=>{    
        application.app.controllers.admin.noticias_salvar(application,req,res)
    });
}
