const mongoose = require('../database/mongoose');

const filmeSchema = new mongoose.Schema({

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
    estoque:{
        type: Number,
        require: true
    },
    CreatedAt:{
        type: Date,
        default: Date.now
    }
})

const Filme = mongoose.model('Filme', filmeSchema);

module.exports = Filme;