// Les routes de users
const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');



router.post('/inscription', usersCtrl.userSingup);
router.post('/login', usersCtrl.userLogin);
router.get('/connect',auth, usersCtrl.userConnected);
router.delete('/deleteaccount', auth, usersCtrl.deleteAccount);
router.post('/changeimage', multer, usersCtrl.changeImage);


module.exports = router;