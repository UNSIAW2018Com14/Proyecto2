const mongoose = require('mongoose');

const bo5Schema = new mongoose.Schema({
		idBo5:{
		type: String,
		required:true
		},
		dia:{
		type: String,
		required:true
		},
		nickIntegrante1:{
		type:String,
		required:true
    },
    nickIntegrante2:{
		type:String,
		required:true
    },
    Resultado:{
		type:String,
		required:true
	}
});
		

module.exports = mongoose.model('bo5s', bo5Schema);