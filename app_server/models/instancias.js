const mongoose = require('mongoose');

const instanciaSchema = new mongoose.Schema({
    idInstancia:{
        type: String,
        required:true
    },
    nombre:{
        type: String,
        required:true
    },
    fechaInicio:{
        type: String,
        required:true
    },
    fechaFin:{
        type:String,
        required:true
    },
    enfrentamientos:{
        type:[String],
        required:true
    }
});
		

module.exports = mongoose.model('instancias', instanciaSchema);