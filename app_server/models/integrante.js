const mongoose = require('mongoose');

const integranteSchema = new mongoose.Schema({
	nombre:{
		type: String,
		required: true
	},
	apellido:{
		type: String,
		required:true
	},
	nickname:{
		type: String,
		required:true
	},
	DNI:{
		type: Number,
		required:true
	},
	edad:{
		type: Number,
		required:true
	},
	sexo:{
		type: String,
		required:true
	},
	foto:{
		type: String,
	},
	cartaFavorita:{
		type: String,
	},
	claseFavorita:{
		type: String,
	}
});

module.exports = mongoose.model('Integrante', integranteSchema);
