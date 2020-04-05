var express = require('express');
var bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
ObjectID = require('mongodb').ObjectID;
var cors = require('cors');
const formidable = require('formidable');
const fs = require("fs");

var app = express();
//app.use(express.static('./uploads')); 
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



var port = 3000;
var dbname = 'instagram';

app.listen(port);
var mongoDB = function () {
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url, function (err, result) {
        if (err) {
            console.log("Erro ao conectar")
            return
        }
    });
    return client;
}
mongo = mongoDB();

console.log("servidor esta escutando na " + port);

app.get('/', (req, res) => {
    res.send({ msg: 'Olá' });
})

app.post('/api', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const form = formidable({ multiples: true });
    console.log("req ", req.url)
    form.parse(req, (err, fields, files) => {
        if (JSON.stringify(files) !== JSON.stringify({})) {
            const date = new Date();
            const time_stamp = date.getTime();
            var url_imagem = files.arquivo.name + time_stamp;
            var pathOrigem = files.arquivo.path;
            var pathDestino = './uploads/' + url_imagem;

            fs.rename(pathOrigem, pathDestino, (err) => {
                if (err) {
                    res.status(500).json({ error: err });
                    return;
                }
            })
            var dados = {
                url_imagem: url_imagem,
                titulo: fields.titulo
            }
            mongoDB().connect(function (err, client) {
                if (err) {
                    console.log("erro local", err)
                    return
                }
                console.log("Connected correctly to server");
                const db = client.db(dbname);
                db.collection('postagens3').insert(dados, function (err, result) {
                    if (err) {
                        res.json(err)
                    } else {
                        //res.writeHead(200, { 'content-type': 'application/json' });
                        //res.end(JSON.stringify({ fields, files }, null, 2));
                        res.json({ "status": "Inclusao realizado com sucesso" });
                    }
                    client.close();
                })
            })

        } else {
            res.status(500).json({ error: err });
            return;
        }

    })
})

app.get('/api', (req, res) => {
    mongoDB().connect(function (err, client) {
        if (err) {
            console.log("erro local", err)
            return
        }
        console.log("Connected correctly to server");
        const db = client.db(dbname);
        db.collection('postagens3').find().toArray(function (err, result) {
            if (err) {
                res.json(err)
            } else {
                res.json(result);
            }
            client.close();
        })
    })

})
app.get('/api/:id', (req, res) => {
    mongoDB().connect(function (err, client) {
        _id = ObjectID(req.params.id)
        if (err) {
            console.log("erro local", err)
            return
        }
        console.log("Connected correctly to server");
        const db = client.db(dbname);
        db.collection('postagens3').find(_id).toArray(function (err, result) {
            if (err) {
                res.json(err)
            } else {
                res.json(result);
            }
            client.close();
        })
    })

})
app.get('/imagens/:imagem', (req, res) => {
    var img = req.params.imagem;
    fs.readFile('./uploads/' + img, function (err, content) {
        if (err) {
            res.status(400).json(err);
            return;
        }
        res.writeHead(200, { 'content-type': 'image/jpg' });
        res.end(content);
    })
})

app.put('/api/:id', (req, res) => {
    _id = ObjectID(req.params.id)
    dados = req.body.comentario;
    //var dados = JSON.parse(req.body)
    console.log("comentario", dados);
    console.log("id", _id);
    mongoDB().connect(function (err, client) {
        if (err) {
            console.log("erro local", err)
            return
        }
        console.log("Connected correctly to server");
        const db = client.db(dbname);
        res.send(dbname);
        /*
        db.collection('postagens').update(
            { _id },
            { $set: { titulo: req.body.titulo, url_img: req.body.url_img } },
            (err, result) => {
                if (err) {
                    res.json(err)
                } else {
                    res.json(result)
                }
                client.close();
            }
        )*/
    })

})
app.delete('/api/:id', (req, res) => {
    _id = ObjectID(req.params.id);
    mongoDB().connect(function (err, client) {
        if (err) {
            console.log("erro local", err)
            return
        }
        console.log("Connected correctly to server");
        const db = client.db(dbname);
        db.collection('postagens').remove({ _id }, function (err, result) {
            if (err) {
                res.json(err)
            } else {
                res.json(result);
            }
            client.close();
        })
    })

})



