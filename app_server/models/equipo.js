const mongoose = require('mongoose');

const equipoSchema = new mongoose.Schema({
	nombre:{
		type: String,
		required:true
	},
	institucion:{
		type: String,
		required:true
	},
	icono:{
		type: String,
		required:true
	},
	integrantes:{
		type:[String],
		required:true,
	}
});
		

module.exports = mongoose.model('Equipo', equipoSchema);
