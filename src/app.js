// modulos instalados
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// invocamos la conexion a la base de datos;
const db = require('./database/db');

// modulos creados.
const cors_config = require('./cors_config');


// codificar los datos de entrada.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// accesso a la api
app.use(cors(
  cors_config.application.cors.server
));

// Directorio public sera nombrado como resources
app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname+'/public'));

// verificar entradas json
app.use((req, res, next) => {
  // console.log(req.body);
  next();
});


// Establecemos el motor de plantilla.
app.set('view engine', 'ejs')
// Para que la plantilla principal sea layout con respecto a las demas vistas
app.use(expressLayouts);

// Var inicio de sesion
const session = require('express-session');
app.use(session({
  secret: 'secret', // Privacidad de la session
  resave: true, // Forma en como se van a guardarlas sessiones
  saveUninitialized: true
}));

// Fin ------

module.exports = app;