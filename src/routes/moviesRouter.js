const {Router} = require('express');
const router  = Router();

// Modulos creados
const {loginMiddle} = require('../middlewares/loginMiddle');
const {rolAdmin} = require('../middlewares/rolAdmin');

// Vistas
const {viewAll, viewDetails} = require('../controllers/PagesController');


// Verificamos que este logueado antes de usar las rutas
router.use(loginMiddle);

router.get('/all',viewAll);

router.get('/details/:id',viewDetails);

module.exports = router;