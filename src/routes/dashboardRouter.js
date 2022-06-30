const {Router} = require('express');
const router  = Router();

const {loginMiddle} = require('../middlewares/loginMiddle');
const {viewPrincipal} = require('../controllers/PagesController');

// dashboard
router.get('/', [
  loginMiddle,
  viewPrincipal
]);

module.exports = router;