const mongoose = require('mongoose');
const Enfrentamiento = mongoose.model('enfrentamientos');

const getEnfrentamientos = function (req, res) {
	Enfrentamiento
		.find()
		.exec((err, enfrentamientos) => {
			if (err) { 
				res
					.status(404)
					.json(err);    
        	} else {
				res
					.status(200)
					.json(enfrentamientos);
			}
		})
}

module.exports = {
	getEnfrentamientos
};