var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/main');

router.get('/', ctrlMain.equiposForm);
//router.post('/add', ctrlMain.equiposFormSubmit);

module.exports = router;