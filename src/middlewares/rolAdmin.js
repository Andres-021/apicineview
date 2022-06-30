const { response } = require("express");

const {alertAccessAdmin} = require('../utils/alerts');

const rolAdmin = (req, res = response, next) => {

  const user = req.session.user;
  const rol = user.rol;
  const login = {login: true, user: user};

  const jsonMerge = Object.assign({}, alertAccessAdmin, login);

  if(req.session.user.rol !== 'admin'){
    // Renderizamos una pagina distinta y redireccionamos al home o dashboard
    res.render('dontAccess', jsonMerge);
  }
  // Caso contrario dejamos pasar
  next();
};

module.exports = {
  rolAdmin
}