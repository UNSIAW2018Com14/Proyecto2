var express = require('express');
var router = express.Router();
const middleware = require('../auth/middleware');
const integranteApi = require('../controllers/integranteApi');
const equipoApi = require('../controllers/equipoApi');
const bo5Api = require('../controllers/bo5Api');
const enfrentamientoApi = require('../controllers/enfrentamientoApi');
const instanciaApi = require('../controllers/instanciaApi');
const ctrlEstilo = require('../controllers/estilo');

/* GET home page. */
router.get('/integrantes', integranteApi.getIntegrantes);
router.get('/equipos', equipoApi.getEquipos);
router.get('/bo5s', bo5Api.getBo5s);
router.get('/enfrentamientos', enfrentamientoApi.getEnfrentamientos);
router.get('/instancias', instanciaApi.getInstancias);
router.post('/estilo', middleware, ctrlEstilo.saveEstilo);
router.get('/estilo', middleware, ctrlEstilo.getEstilo);
router.post('/equiposFavoritos', middleware, equipoApi.saveEquiposFavoritos);
router.get('/equiposFavoritos', middleware, equipoApi.getEquiposFavoritos);
router.post('/integrantesFavoritos', middleware, integranteApi.saveIntegrantesFavoritos);
router.get('/integrantesFavoritos', middleware, integranteApi.getIntegrantesFavoritos);
router.post('/comentarios', middleware, bo5Api.saveComentarios);


module.exports = router;
