const validator = require('validator');
const bcrypt = require('bcrypt');

// Modelo
const user = require('../../models/userModel');

// Modulos creados.
const formatErrors = require('../../middlewares/formatErrors');
const {alertAccessAdmin, alertSuccess, alertError} = require('../../utils/alerts');



const CreateUserView = async(req, res) => {
  // Se desglozan los datos para tomar la contraseña.
  const {name, second_name, surname, second_surname, email, password, gender, rol} = req.body;
  const userLogged = req.session.user;
  const login = {login: true, user: userLogged};
  // Almacenar errores
  const Errors = [];

  try{

    // Verificando email correcto.
    if(!validator.isEmail(email)){
      Errors.push({path: 'email', message: 'Por favor, introduzca un email valido.'});
    }

    // Verificando el tamaño de la contraseña.
    if(password.length < 8 || password.length > 16){
      Errors.push({path: 'password', message: 'La contraseña debe tener entre 8 y 16 caracteres.'})
    }

    // Si es efectivo el siguiente if, activa el catch.
    if(Errors.length){
      throw Errors;
    }

    // Encriptamos la contraseña
    const hashPassword = await bcrypt.hash(password, 10);

    const userCreated = await user.create({name, second_name, surname, second_surname, email, password: hashPassword, gender, rol})
    if(!userCreated){
      console.log('No se pudo crear el usuario.');
      return 0;
    }

    // Renderizamos la vista y mostramos la alerta
    const jsonMerge = Object.assign({},alertSuccess('Se ha registrado correctamente el usuario.'), login);
    res.render('register', jsonMerge);

  }catch(e){
    console.log(e);
    // Concatenamos la alerta con el login
    const jsonMerge = Object.assign({},alertError('Hubo un problema al registrar el usuario.'), login);
    res.render('register', jsonMerge);
  }
}

const getAllUserView = async() => {
  const userLogged = req.session.user;
  const login = {login: true, user: userLogged};
  const Errors = [];

  try{ 
    const userGettered = await user.find({},'name second_name surname second_surname email gender rol date_of_creation');
    if(!userGettered){
      Errors.push({message: 'Error al obtener los datos de la db.'})
    }

    if(Errors.length){
      throw Errors;
    }

    // Creamos una variable en el objeto para guardar los usuarios
    login.users = userGettered;

    // Concatenamos la alerta con el login
    const jsonMerge = Object.assign({},
      alertError(userGettered.length?"Se han listado los usuarios.":"No se encontraron usuarios registrados."), 
      login
    );
    res.render('users', jsonMerge);
    
  }catch(e){
    // Creamos una variable en el objeto para guardar los usuarios
    login.users = [];

    // Concatenamos la alerta con el login
    const jsonMerge = Object.assign({},
      alertError("Hubo un error al listar los usuarios."), 
      login
    );
    res.render('users', jsonMerge);
  }
}

module.exports = {
  CreateUserView,
  getAllUserView
}
