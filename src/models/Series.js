const mongoose = require('../database/mongoose');
//criando o modelo de serie
const serieSchema = new mongoose.Schema({

    titulo:{
        type: String,
        unique: true,
        require: true
    },
    nota:{
        type: Number,
        require: true
    },
    sinopse:{
        type: String,
        require: true
    },
    temporadas: {
        type: Number,
        require: true
    },
    estoque:{
        type: Number,
        require: true
    },
    CreatedAt:{
        type: Date,
        default: Date.now
    }
})

const Serie = mongoose.model('Serie', serieSchema);

module.exports = Serie;