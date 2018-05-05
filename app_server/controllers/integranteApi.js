const mongoose = require('mongoose');
const Integrante = mongoose.model('Integrante');

const getIntegrantes = function (req, res) {
	Integrante
		.find()
		.exec((err, integrantes) => {
			if (err) { 
				res
					.status(404)
					.json(err);    
        	} else {
				res
					.status(200)
					.json(integrantes);
			}
		})
}

module.exports = {
	getIntegrantes
};