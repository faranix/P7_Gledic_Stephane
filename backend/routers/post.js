// Les routes des posts
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const postCtrl = require('../controllers/post');


router.post('/createpost', auth, postCtrl.createPost);
router.put('/editpost', auth, postCtrl.editPost);
router.delete('/deletepost', auth, postCtrl.deletePost);
router.get('/getpost', auth, postCtrl.getPost);


module.exports = router;
