// Les routes de users
const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');


// Routes du compte
router.post('/inscription', usersCtrl.userSingup);
router.post('/login', usersCtrl.userLogin);
router.get('/connect',auth, usersCtrl.userConnected);

// Route pour supprimer le compte
router.delete('/deleteaccount', auth, usersCtrl.deleteAccount);

// Routes pour l'image
router.post('/changeimage', auth, multer, usersCtrl.changeImage);
router.get('/getimage', usersCtrl.getimage);
router.delete('/deleteimage', usersCtrl.deleteimage);


module.exports = router;