const express = require('express');
const Filme = require('../models/Filme');
const router = express.Router();

router.post('/cadastro', async(req,res)=>{
    try {                
            const data = await new Filme({
                titulo: req.body.titulo,
                nota: req.body.nota,
                sinopse: req.body.sinopse,
                estoque: req.body.estoque
            })
            data.save().then(()=>{
               console.log( 'O filme foi cadastrado')
               res.send({data})
            }).catch((err)=>{
               res.send(`Erro: Filme já existe`)
            })        
    } catch(error) {
        res.status(400).send({erro: `Falha ao cadastrar o filme`})
    }
});

module.exports = app=> app.use('/filme', router);