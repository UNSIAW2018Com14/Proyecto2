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

const getIntegrantesFavoritos = function (req, res) {
	User
		.findOne({'facebookid': req.user.facebookid})
		.exec((err, user) => {
			if (err || !user) { 
				res
					.status(404)
					.json(err);    
        	} else {
				res
					.status(200)
					.json(user.integrantesFavoritos);
					
			}
		});
};

const saveIntegrantesFavoritos = function (req, res) {
	User
	   .update({facebookid: req.user.facebookid}, {integrantesFavoritos: req.body.integrantesFavoritos}, 
		   {upsert: true, setDefaultsOnInsert: true}, (err, integrantesFavoritos) => {
			   if (err) { 
				   res
					   .status(400)
					   .json(err);    
			   } else {
				   res
					   .status(201)
					   .json(integrantesFavoritos);
			   }
		   });
};

module.exports = {
	getIntegrantes,
	getIntegrantesFavoritos,
	saveIntegrantesFavoritos
};