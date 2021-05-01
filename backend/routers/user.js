// Les routes de users
const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/user');
const auth = require('../middlewares/auth');



router.post('/inscription', usersCtrl.userSingup);
router.post('/login', usersCtrl.userLogin);
router.get('/connect',auth, usersCtrl.userConnected);


module.exports = router;