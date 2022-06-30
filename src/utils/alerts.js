
const alertAccessAdmin = {
    // Variables para alerta
  alert: true,
  alertTitle: "Solo el admin tiene acceso.",
  alertIcon: "warning",
  showConfirmButton: true,
  timer: '',
  ruta: ''
}

const alertSuccess = (message) => {
  return{
    alert: true,
    alertTitle: message,
    alertIcon: "success",
    showConfirmButton: '',
    timer: 1500,
  }
}

const alertError = (message) => {
  return{
    alert: true,
    alertTitle: message,
    alertIcon: "error",
    showConfirmButton: true,
    timer: '',
  } 
}

module.exports = {
  alertAccessAdmin,
  alertSuccess,
  alertError
}