const express = require('express');
const Filme = require('../models/Filme');
const cors = require('cors');
const { findOne } = require('../models/Filme');
const router = express.Router();

router.post('/cadastro', async(req,res)=>{
    try {             
            const data = await new Filme({
                titulo: req.body.titulo,
                nota: req.body.nota,
                sinopse: req.body.sinopse,
                estoque: req.body.estoque,
                imagem: req.body.imagem
            })
            titulo = await Filme.findOne({titulo: req.body.titulo});
            if(titulo){
                res.status(400).send('Erro: filme já existe')
            }else{
                //salva a variavel no banco dedados
            data.save().then(()=>{
                res.status(200).send({data})
             }).catch((err)=>{
                 res.status(400).send(`Erro: Não foi possível salvar o filme`)
             }) 
            }      
    } catch(error) {
        res.status(500).send({erro: `Falha ao cadastrar o filme`})
    }
});

router.get('/lista', (req,res)=>{
    try {
        Filme.find().lean().then((filmes)=>{
            res.status(200).send(filmes);
        }).catch((err)=>{
            res.status(404).send('Filmes não encontrados')
        })
    } catch (error) {
        res.status(500).send(`Ocorreu o erro: ${error}`)
    }   
});

router.post('/editar/:titulo', async(req,res)=>{
    data = await Filme.findOne({titulo: req.params.titulo});
    if(data){
        Filme.findOneAndUpdate({titulo: req.params.titulo}, {titulo: req.body.titulo, nota:req.body.nota, sinopse:req.body.sinopse, estoque: req.body.estoque, data: Date.now}).then(()=>{
          res.status(200).send('filme atualizado')
        }).catch((err)=>{
            res.status(500).send(err)
        })
    }else{
        res.status(404).send('filme não existe')
    }
});

router.post('/deletar/:titulo', async(req,res)=>{
    data = await Filme.findOne({titulo: req.params.titulo});
    if(data){
        Filme.findOneAndDelete({titulo: req.params.titulo}).then(()=>{
            res.status(200).statussend('Deletado com sucesso')
        }).catch((err)=>{
            res.status(500).send(err)
        })
    }else{
        res.status(404).send('filme não existe')
    }
    
});

module.exports = app=> app.use('/filme', router);
