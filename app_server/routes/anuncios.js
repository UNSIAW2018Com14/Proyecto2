var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/main');

router.get('/', ctrlMain.anuncios);

module.exports = router;