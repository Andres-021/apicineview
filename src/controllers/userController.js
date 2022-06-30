const validator = require('validator');
const bcrypt = require('bcrypt');

// Modelo
const user = require('../models/userModel');

// Modulos creados.
const formatErrors = require('../middlewares/formatErrors');




const createUser = async(userInput) => {
  // Se desglozan los datos para tomar la contraseña.
  const {name, second_name, surname, second_surname, email, password, gender, rol} = userInput;
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

    return{
      success: userCreated && userCreated._id? true: false,
      message: 'Se ha registrado correctamente el usuario.',
      status: 201
    }

  }catch(e){
    console.log(e);
    return{
      success: false,
      message: 'Hubo un problema al registrar el usuario.',
      errors: formatErrors(e, Errors),
      status: 500
    }
  }
}

const getAllUser = async() => {
  const Errors = [];

  try{ 
    const userGettered = await user.find({},'name second_name surname second_surname email gender rol date_of_creation');
    if(!userGettered){
      Errors.push({message: 'Error al obtener los datos de la db.'})
    }

    if(Errors.length){
      throw Errors;
    }

    return{
      success: true,
      data: userGettered,
      message: userGettered.length?"Se han listado los usuarios.":"No se encontraron usuarios registrados.",
      status: 200
    }
  }catch(e){
    return{
      success: false,
      message: "Hubo un error al listar los usuarios.",
      errors: formatErrors(e, Errors),
      status: 500
    }
  }
}

const getUserByEmail = async(email) => {
  const Errors = [];

  try{ 
    const userGettered = await user.find({email: email},'name second_name surname second_surname email gender rol date_of_creation');
    if(!userGettered){
      Errors.push({message: 'Error al obtener los datos de la db.'})
    }

    if(Errors.length){
      throw Errors;
    }

    return{
      success: true,
      data: userGettered,
      message: userGettered.length?"Se ha encontrado el usuario.":"No se ha encontrado el usuario.",
      status: 200
    }
  }catch(e){
    return{
      success: false,
      message: "Hubo un error al buscar el usuario.",
      errors: formatErrors(e, Errors),
      status: 500
    }
  }
}

const deleteUser = async(id) => {
  const Errors = [];
  
  try{
    const userDeleted = await user.findByIdAndDelete(id);
    if(!userDeleted){
      Errors.push({message: 'Error al obtener los datos de la db.'})
    }

    if(Errors.length){
      throw Errors;
    }

    return{
      success: true,
      message: "Usuario eliminado correctamente.",
      status: 200
    }
  }catch(e){
    return{
      success: false,
      message: "Error al eliminar el usuario.",
      errors: formatErrors(e, Errors),
      status: 500
    }
  }
}

const userPerissions = () => {



}

module.exports = {
  createUser,
  getAllUser,
  getUserByEmail,
  deleteUser,
  userPerissions
}