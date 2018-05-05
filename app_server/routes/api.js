var express = require('express');
var router = express.Router();
const integranteApi = require('../controllers/integranteApi');
const equipoApi = require('../controllers/equipoApi');
const bo5Api = require('../controllers/bo5Api');
const enfrentamientoApi = require('../controllers/enfrentamientoApi');
const instanciaApi = require('../controllers/instanciaApi');

/* GET home page. */
router.get('/integrantes', integranteApi.getIntegrantes);
router.get('/equipos', equipoApi.getEquipos);
router.get('/bo5s', bo5Api.getBo5s);
router.get('/enfrentamientos', enfrentamientoApi.getEnfrentamientos);
router.get('/instancias', instanciaApi.getInstancias);

module.exports = router;
