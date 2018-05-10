const mongoose = require('mongoose');
const Instancia = mongoose.model('instancias');

const getInstancias = function (req, res) {
	Instancia
		.find()
		.exec((err, instancias) => {
			if (err) { 
				res
					.status(404)
					.json(err);    
        	} else {
				res
					.status(200)
					.json(instancias);
			}
		})
}

module.exports = {
	getInstancias
};