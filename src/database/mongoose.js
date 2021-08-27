const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/App", {useNewUrlParser: true, useUnifiedTopology: true}).then(() =>{
    console.log("Conectado com sucesso!")
}).catch((err) =>{
    mongoose.Promise = global.Promise;
    console.log("Erro ao conectar: " + err)
});

mongoose.Promise = global.Promise;

module.exports = mongoose;