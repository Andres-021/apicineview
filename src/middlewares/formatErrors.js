const formatErrors = (error, otherErrors) => {
  const errors = error.errors;
  let objErrors = []

  // Si errors es indefinido significa que no hubo problema con el try
  // entonces retornamos otherErrors
  if(errors){
    Object.entries(errors).map(error =>{
      const {path, message} = error[1];
      objErrors.push({path, message})
    });
    // Concatenamos para mostrar los errores juntos
    objErrors = objErrors.concat(otherErrors);
    return objErrors;
  }else if(otherErrors.length){
    return otherErrors;
  }
  

  const unknowError = {}
  // Pero si ningun if anterior sucede, buscamos el caso de error
  // Esto es solo si no obtenemos ningun error anterior o es un error no visible
  switch(error.code){
    case 11000:
      unknowError.path = 'email'
      unknowError.message = 'El correo ya se encuentra en uso.'
      //console.log(objErrors)
      break;

    default:
      unknowError.path = 'Desconocido'
      unknowError.message = error.message
  }

  return [unknowError];
}
module.exports = formatErrors;