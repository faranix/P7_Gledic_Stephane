const db = require('../service/db');
const jwt = require('jsonwebtoken');

/**
 * Permet de crée un nouveau post 
 */
exports.createPost = (req, res, next) => {
    const token = jwt.decode(req.headers.authorization.split(' ')[1]);
    const decode = token.userId;

    let inserts = [
        req.body[1],
        req.body[2],
        req.body[0]
    ];
    
    // Verifie que id du local storage et celui du token son identique.
    if (decode == req.body[0]) {
        db.query(`INSERT INTO post(title, url, user_id) VALUES (?, ?, ?) `, inserts, (err, result) => {
            if (err) throw err;
    
            res.status(201).json(result);
        });
    } else {
        console.log('Requete non authentique !');
        res.status(400).json({ message: 'Requete non authentique !' });
    }
};


/**
 * Modifier un post
 */
exports.editPost = (req, res, next) => {  
    let inserts = [
        req.body.title,
        req.body.url,
        req.body.postId
    ];
    
    // Verifie que id du local storage et celui du token son identique.
        db.query(`UPDATE post SET title=?, url=? WHERE id=? LIMIT 1 `, inserts, (err, result) => {
            if (err) throw err;
            
            if (result) {
                let insertsSelect = [
                    req.body.postId
                ];

                db.query(`SELECT post.*, user.pseudo FROM post INNER JOIN user ON user.id = user_id WHERE post.id=?`, insertsSelect, (err, result) => {
                    if (err) throw err;

                    res.status(200).json(result);
                });
            }
        });
};


/**
 * Supprimer un post
 */
exports.deletePost = (req, res, next) => {
    let inserts = [
        req.body.id
    ];

    db.query(`DELETE FROM commentaire WHERE post_id = ?`, inserts, (err, result) => {
        if (err) throw err;
        
        db.query(`DELETE FROM post WHERE id = ?`, inserts, (err, result) => {
            if (err) throw err;

            res.status(200).json({ message: 'Post Supprimer !' });
        });
    });
};

/**
 * Afficher un post
 */
exports.getPost = (req, res, next) => {
    db.query(`SELECT post.*, user.pseudo FROM post INNER JOIN user ON user_id = user.id`, (err, result) => {
        if (err) throw err;

        res.status(200).json(result);

    });
};