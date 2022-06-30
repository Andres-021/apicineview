const {createUser, getAllUser, getUserByEmail, deleteUser} = require('../controllers/userController');

const {alertAccessAdmin, alertSuccess, alertError} = require('../utils/alerts');

// Api
const movie = require('../config/api/movies');


const viewLogin = (req, res) => {
  res.render('login');
}

const viewPrincipal = (req, res) =>{
  res.render('home',{
    login: true,
    user: req.session.user
  });
}

const viewRegister = (req, res) => {
  const user = req.session.user;
  const login = {login: true, user: user};
  
  res.render('register',login);
}

const viewUsers = async(req, res) => {
  const user = req.session.user;

  // Obtener todos los usuarios
  const resp = await getAllUser();
  const {success, message, data} = resp;
  
  // Configuramos datos a enviar
  const login = {login: true, user: user, users: data};

  // Si la consulta salio mal muestra un mensaje
  if(!success){
    // Concatenamos
    const jsonMerge = Object.assign({},alertError(message), login);
    res.render('users', jsonMerge);

  }else{
    // En caso de ser correcto
    // Renderizamos la vista y mostramos la alerta
    const jsonMerge = Object.assign({},alertSuccess(message), login);
    res.render('users', jsonMerge);
  }
}

const viewUsersEmail = async(req, res) => {
  const user = req.session.user;
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
  
  
  var url = new URL(fullUrl).search;
  var searchParams = new URLSearchParams(url);
  var email = searchParams.get('search');

  const resp = await getUserByEmail(email);
  const {success, message, data} = resp;
  
  const login = {login: true, user: user, users: data};


  // Si la consulta salio mal muestra un mensaje
  if(!success){
    // Concatenamos
    const jsonMerge = Object.assign({},alertError(message), login);
    res.render('users', jsonMerge);

  }else{
    // En caso de ser correcto
    // Renderizamos la vista y mostramos la alerta
    const jsonMerge = Object.assign({},alertSuccess(message), login);
    res.render('users', jsonMerge);
  }
}

const viewAll = async(req, res) => {

  const url = req.url;
  const {id} = req.params;

  let resp = {};

  if(url === '/all'){
    resp = await movie.getPopularMovies();
  }

  res.render('all',{
    login: true,
    user: req.session.user,
    watchs: resp.results,
    page: resp.page,
    total_pages: resp.total_pages,
    total_results: resp.total_results
  });
}


const viewDetails = async(req, res) => {

  // Eliminar los parametros en la url
  // Inciando de 0 y elimando los que estan despues del 9.
  // let newUrl = url.slice(0,9);

  const {id} = req.params;


  const resp = await movie.getDetailsMovies(id);

  res.render('details',{
    login: true,
    user: req.session.user,
    details: resp
  });
}

module.exports = {
  viewLogin,
  viewPrincipal,

  viewRegister,
  viewUsers,
  viewUsersEmail,

  viewAll,
  viewDetails
}