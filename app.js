var express = require('express');
var app = express();

app.set('view engine', 'ejs');


app.get('/', (req,res)=> {
    res.send('Estou na home')
});

app.get('/tecnologia', (req,res)=> {
    res.render('secao/tecnologia')
});

app.listen(3000, function(){
    console.log("escutando 3000");
});


