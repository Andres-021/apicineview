const {Router} = require('express');
const router  = Router();

// Modulos creados
const {loginMiddle} = require('../middlewares/loginMiddle');
const {rolAdmin} = require('../middlewares/rolAdmin');

const {viewRegister, viewUsers, viewUsersEmail} = require('../controllers/PagesController');
const {CreateUserView} = require('../controllers/views/userController');


// Verificamos que este logueado antes de usar las rutas
router.use(loginMiddle)

router.post('/registration', CreateUserView);

router.get('/registration',[
  rolAdmin,
  viewRegister
]);


// Solo admin
router.get('/users',[
  rolAdmin,
  viewUsers
]);

router.get('/users/search',[
  rolAdmin,
  viewUsersEmail
]);

router.put('/users', async(req, res) => {
  // const user = req.user;
  try{

  }catch(e){
    console.log(e);
  }
});

router.delete('/users/:id', async(req, res) => {
  const {id} = req.params;

  try{
    const resp = await deleteUser(id);
    res.status(resp.status).json(resp);

  }catch(e){
    console.log(e);
  }
});

module.exports = router;