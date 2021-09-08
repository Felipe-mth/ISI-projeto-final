const express = require('express');
const Serie = require('../models/Series');
const router = express.Router();

router.post('/cadastro', async(req,res)=>{
    
    try {  
            //salva o que vem do front dentro da variavel data              
            const data = await new Serie({
                titulo: req.body.titulo,
                nota: req.body.nota,
                sinopse: req.body.sinopse,
                estoque: req.body.estoque,
                temporadas:  req.body.temporadas
            })
            //salva a variavel no banco de dados
            titulo = await Serie.findOne({titulo: req.body.titulo});
            if(titulo){
                res.status(400).send('Erro: Serie já existe')
            }else{
                //salva a variavel no banco dedados
            data.save().then(()=>{
                console.log( 'A serie foi cadastrado')
                res.status(200).send({data})
             }).catch((err)=>{
                res.status(400).send(`Erro: Não foi possível salvar a serie`)
             }) 
            }
            //tratamento de erros no cadastro    
    } catch(error) {
        res.status(500).send({erro: `Falha ao cadastrar a serie`})
    }
});

router.get('/lista', (req,res)=>{
    try {
        Serie.find().lean().then((serie)=>{
            res.status(200).send(serie);
        }).catch((err)=>{
            res.status(404).send('Serie não encontrados')
        })
    } catch (error) {
        res.status(500).send(`Ocorreu o erro: ${error}`)
    }   
});

router.post('/editar/:titulo', async(req,res)=>{
    //busca uma Serie com o mesmo titulo do que vem no url e salva em data
    data = await Serie.findOne({titulo: req.params.titulo});
    //se tiver um serie salvo em data ele edita
    if(data){
        Serie.findOneAndUpdate({titulo: req.params.titulo}, {titulo: req.body.titulo, nota:req.body.nota, sinopse:req.body.sinopse, estoque: req.body.estoque, temporadas:  req.body.temporadas, data: Date.now}).then(()=>{
            res.status(200).send('serie atualizado')
        }).catch((err)=>{
            res.status(500).send(err)
        })
        //caso contrário o serie digitado não existe
    }else{
        res.status(404).send('Serie não existe')
    }
});

router.post('/deletar/:titulo', async(req,res)=>{
    //busca uma serie com o mesmo titulo do que vem no url e salva em data
    data = await Serie.findOne({titulo: req.params.titulo});
    //se data tem uma serie essa serie e deletado
    if(data){
        Serie.findOneAndDelete({titulo: req.params.titulo}).then(()=>{
            res.status(200).send('Serie deletada com sucesso')
        }).catch((err)=>{
            res.status(500).send(err)
        })
        //caso contrario o serie não existe
    }else{
        res.status(404).send('Serie não existe')
    }
    
});

module.exports = app=> app.use('/serie', router);
