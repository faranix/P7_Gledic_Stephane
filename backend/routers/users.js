// Les routes de users
const express = require('express');
const router = express.Router();
const usersCtrl = require('../controllers/users');
const auth = require('../middlewares/auth');



router.post('/inscription', usersCtrl.usersSingup);
router.post('/login', usersCtrl.usersLogin);
router.get('/connect',auth ,usersCtrl.userConnected);


module.exports = router;