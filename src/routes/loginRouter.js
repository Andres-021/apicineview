const {Router} = require('express');
const router  = Router();

const {loginMiddle} = require('../middlewares/loginMiddle');
const {viewLogin} = require('../controllers/PagesController');
const loginSession = require('../controllers/loginController');


router.post('/login', async(req, res) => {
  const data = req.body;

  try{
    const resp = await loginSession(data);
    if(!resp.success){
      // Renderizamos la vista y mandamos las opciones al html
      res.render('login',{
        alert: true,
        alertTitle: resp.message,
        alertIcon: "error",
        showConfirmButton: true,
        timer: '',
        ruta: 'login'
      })

    }else{
      // Esto para verificar la session en las demas paginas
      req.session.loggedin = true;
      req.session.user = resp.res;
      // Renderizamos la vista y mostramos la alerta
      res.render('login',{
        alert: true,
        alertTitle: resp.message,
        alertIcon: "success",
        showConfirmButton: '',
        timer: 1500,
        ruta: ''
      });
    }

  }catch(e){
    console.log(e);
  }

})
// Fin ------

// Verificando si ha iniciado session no pueda volver al login
// De lo contrario se renderiza la vista login
router.get('/login',[
  viewLogin
]);


router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  })
});

module.exports = router;