const db = require('../service/db');
const jwt = require('jsonwebtoken');

/**
 * Permet de crée un nouveau post 
 */
exports.createPost = (req, res, next) => {
    const token = jwt.decode(req.headers.authorization.split(' ')[1]);
    const decode = token.userId;
    
    // Verifie que id du local storage et celui du token son identique.
    if (decode == req.body[0]) {
        db.query(`INSERT INTO post(title, url, user_id) VALUES ("${req.body[1]}", "${req.body[2]}", ${req.body[0]}) `, (err, result) => {
            if (err) throw err;
    
            res.status(201).json(result);
        });
    } else {
        console.log('Requete non authentique !');
        res.status(400).json({ message: 'Requete non authentique !' });
    }
}


/**
 * Modifier un post
 */
exports.editPost = (req, res, next) => {   
    // Verifie que id du local storage et celui du token son identique.
        db.query(`UPDATE post SET title="${req.body.title}", url="${req.body.url}" WHERE id=${req.body.postId} LIMIT 1 `, (err, result) => {
            if (err) throw err;
            
            if (result) {
                db.query(`SELECT post.*, user.pseudo FROM post INNER JOIN user ON user.id = user_id WHERE post.id=${req.body.postId}`, (err, result) => {
                    if (err) throw err;

                    res.status(200).json(result);
                });
            }
        });
}


/**
 * Supprimer un post
 */
exports.deletePost = (req, res, next) => {
    console.log(req.body.id);
    db.query(`DELETE FROM commentaire WHERE post_id = ${req.body.id}`, (err, result) => {
        if (err) throw err;
        
        db.query(`DELETE FROM post WHERE id = ${req.body.id}`, (err, result) => {
            if (err) throw err;

            res.status(200).json({ message: 'Post Supprimer !' });
        })
    })
}
/**
 * Afficher un post
 */
exports.getPost = (req, res, next) => {
    db.query(`SELECT post.*, user.pseudo FROM post INNER JOIN user ON user_id = user.id`, (err, result) => {
        if (err) throw err;

        res.status(200).json(result);

    })
}