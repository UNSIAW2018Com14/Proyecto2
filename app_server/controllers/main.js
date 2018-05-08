const mongoose = require('mongoose');
const Equipo = mongoose.model('Equipo');

/* GET home page. */
const index = function (req, res) { 
  res.render('index', {user: req.user});
};

const informacion = function (req, res) { 
  res.render('informacion', {user: req.user});
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
              equipos: equipos,
              user: req.user
            });
          }
        })
      };

const leaderboard = function (req, res) { 
  res.render('leaderboard', {user: req.user});
};

const anuncios = function (req, res) { 
  res.render('anuncios', {user: req.user});
};

const fixture = function (req, res) { 
  res.render('fixture', {user: req.user});
};

const equiposForm = function (req, res) { 
  res.render('equiposForm', {user: req.user});
};

const integrantesForm = function (req, res) { 
  res.render('integrantesForm', {user: req.user});
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
}