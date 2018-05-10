var express = require('express');
var router = express.Router();
const ctrlMain = require('../controllers/main');
const bo5Api = require('../controllers/bo5Api');
const middleware = require('../auth/middleware');

router.post('/comentarios', middleware, bo5Api.saveComentarios);
router.get('/', ctrlMain.informacion);

module.exports = router;