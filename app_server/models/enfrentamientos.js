const mongoose = require('mongoose');

const enfrentamientoSchema = new mongoose.Schema({
		idEnfrentamiento:{
		type: String,
		required:true
		},
		equipo1:{
		type: String,
		required:true
		},
		equipo2:{
		type: String,
		required:true
		},
		editor:{
		type:String,
		required:true
    },
    bo5:{
		type:[String],
		required:true
    }
});
		

module.exports = mongoose.model('enfrentamientos', enfrentamientoSchema);