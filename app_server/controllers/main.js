const mongoose = require('mongoose');
const Equipo = mongoose.model('Equipo');

/* GET home page. */
const index = function (req, res) { 
  res.render('index');
};

const informacion = function (req, res) { 
  res.render('informacion');
};

const participantes = function (req, res) { 
  Equipo
    .find()
        .exec((err, equipos) => {
          if (err) { 
            res.render('error', { 
              error : err
            });    
              } else {
            res.render('participantes', {
              title: 'Equipos', 
              equipos: equipos 
            });
          }
        })
      };

const leaderboard = function (req, res) { 
  res.render('leaderboard');
};

const anuncios = function (req, res) { 
  res.render('anuncios');
};

const fixture = function (req, res) { 
  res.render('fixture');
};

const equiposForm = function (req, res) { 
  res.render('equiposForm');
};

const integrantesForm = function (req, res) { 
  res.render('integrantesForm');
};

const login = function (req, res) { 
  res.render('login');
};

module.exports = {
  index,
  informacion,
  participantes,
  leaderboard,
  anuncios,
  fixture,
  equiposForm,
  integrantesForm,
  login
}