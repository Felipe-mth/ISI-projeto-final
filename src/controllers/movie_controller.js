const express = require('express');
const Filme = require('../models/Filme');
const router = express.Router();

router.post('/cadastro', async(req,res)=>{
    try {  
            //salva o que vem do front dentro da variavel data              
            const data = await new Filme({
                titulo: req.body.titulo,
                nota: req.body.nota,
                sinopse: req.body.sinopse,
                estoque: req.body.estoque
            })
            //salva a variavel no banco dedados
            if(await Filme.findOne({titulo: data.titulo})){
                res.send('Erro: filme já existe')
            }else{
                //salva a variavel no banco dedados
            data.save().then(()=>{
                console.log( 'O filme foi cadastrado')
                res.send({data})
             }).catch((err)=>{
                 //caso ocorra um erro ao salvar: futuramente servirá para testar se o filme adicionado ja existe
                res.send(`Erro: Filme já existe`)
             }) 
            }
            //tratamento de erros no cadastro    
    } catch(error) {
        res.status(400).send({erro: `Falha ao cadastrar o filme`})
    }
});

router.get('/lista', (req,res)=>{
    Filme.find().lean().then((filmes)=>{
        res.send(filmes);
    })
    
})


module.exports = app=> app.use('/filme', router);