const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({ origin: true }));


const bodyParser = require('body-parser');
const porta = 8080;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());




//Chama o controller de filmes passando app para ele
require('./controllers/movie_controller')(app);
//Chama o controller de series passando app para ele
require('./controllers/series_controller')(app);
//página inicial
app.get('/', (req,res)=>{
    res.send('Home');
});

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});


app.listen(porta, ()=>{
    console.log('server rodando na porta http://localhost:8080')
})