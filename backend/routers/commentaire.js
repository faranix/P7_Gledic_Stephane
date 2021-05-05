const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const commetaireCtrl = require('../controllers/commentaire');


router.post('/post', auth, commetaireCtrl.postCommentaire);
router.get('/get', auth, commetaireCtrl.getCommentaire);




module.exports = router;