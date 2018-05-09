const mongoose = require('mongoose');
const Bo5 = mongoose.model('bo5s');

const getBo5s = function (req, res) {
	Bo5
		.find()
		.exec((err, bo5s) => {
			if (err) { 
				res
					.status(404)
					.json(err);    
        	} else {
				res
					.status(200)
					.json(bo5s);
			}
		})
}

const saveComentarios = function (req, res) {
	Bo5
	   .update({idBo5: req.body.Enfrentamiento}, {$push:{comentarios: req.body.Comentario}}, 
		   {upsert: true, setDefaultsOnInsert: true}, (err, comentario) => {
			   if (err) { 
				   res
					   .status(400)
					   .json(err);    
			   } else {
				   res
					   .status(201)
					   .json(comentario);
			   }
		   });
};


module.exports = {
	getBo5s,
	saveComentarios
};