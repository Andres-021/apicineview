
const loginMiddle = (req, res, next) =>{

  if(!req.session.loggedin && (req.session.user === undefined || req.session.user === null)){
    res.redirect('/login');
  }
  
  // dejamos pasar
  next();
}

module.exports = {
  loginMiddle
}