const bcrypt = require('bcrypt');

const user = require('../models/userModel');
const {getJWT} = require('../helpers/auth');

const loginSession = async(data) => {
  const {userLogin, password} = data;

  try{

    if(!userLogin && !password){
      return{
        success: false,
        message: 'Campos vacios, por favor digite sus credenciales.',
        status: 400
      }
    }

    const userFinded = await user.findOne({email: userLogin}, 'name surname password rol img');
    if(!userFinded || !(await bcrypt.compare(password, userFinded.password))){
      return{
        success: false,
        message: 'Usuario o contraseña incorrectos.',
        status: 400
      }
    }


    // Generando json web token
    const token = getJWT(userFinded._id);
    return{
      success: true,
      res: userFinded,
      token: token,
      message: 'Se ha iniciado sesion correctamente.',
      status: 200
    }

  }catch(e){
    console.log(e);
  }
}

module.exports = loginSession;