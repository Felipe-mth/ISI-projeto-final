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
            //salva a variavel no banco de dados
            if(await Filme.findOne({titulo: data.titulo})){
                res.send('Erro: filme já existe')
            }else{
                //salva a variavel no banco dedados
            data.save().then(()=>{
                console.log( 'O filme foi cadastrado')
                res.send({data})
             }).catch((err)=>{
                res.send(`Erro: Não foi possível salvar o filme`)
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

router.post('/editar/:titulo', async(req,res)=>{
    //busca um filme com o mesmo titulo do que vem no url e salva em data
    data = await Filme.findOne({titulo: req.params.titulo});
    //se tiver um filme salvo em data ele edita
    if(data){
        Filme.findOneAndUpdate({titulo: req.params.titulo}, {titulo: req.body.titulo, nota:req.body.nota, sinopse:req.body.sinopse, estoque: req.body.estoque, data: Date.now}).then(()=>{
            res.send('show')
        }).catch((err)=>{
            res.send(err)
        })
        //caso contrário o filme digitado não existe
    }else{
        res.send('filme não existe')
    }
})

router.post('/deletar/:titulo', async(req,res)=>{
    //busca um filme com o mesmo titulo do que vem no url e salva em data
    data = await Filme.findOne({titulo: req.params.titulo});
    //se data tem um filme esse filme e deletado
    if(data){
        Filme.findOneAndDelete({titulo: req.params.titulo}).then(()=>{
            res.send('Deletado com sucesso')
        }).catch((err)=>{
            res.send(err)
        })
        //caso contrario o filme não existe
    }else{
        res.send('filme não existe')
    }
    
})


module.exports = app=> app.use('/filme', router);