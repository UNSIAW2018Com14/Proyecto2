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

module.exports = {
	getBo5s
};