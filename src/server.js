const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const porta = 8080;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
//Chama o controller de filmes passando app para ele
require('./controllers/movie_controller')(app);
//página inicial
app.get('/', (req,res)=>{
    res.send('Home');
});


app.listen(porta, ()=>{
    console.log('server rodando na porta http://localhost:8080')
})