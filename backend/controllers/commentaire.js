// Import de la base de données
const db = require('../service/db');


/**
 * Permet de poster un commentaire !
 */
exports.postCommentaire = (req, res, next) => {
    db.query(`INSERT INTO commentaire(content, user_id, post_id) VALUES ("${req.body.content}", ${req.body.userId}, ${req.body.postId})`, (err, result) => {
        if (err) throw err;

        db.query(`SELECT commentaire.*, user.pseudo FROM commentaire INNER JOIN user ON user_id = user.id`, (err, result) => {
            if (err) throw err;

            res.status(201).json(result);
        })
    });
};

/**
 * Permet d'aficher un commentaire !
 */
exports.getCommentaire = (req, res, next) => {
    db.query(`SELECT commentaire.*, user.pseudo FROM commentaire INNER JOIN user ON user_id = user.id`, (err, result) => {
        if (err) throw err;

        res.status(200).json(result);
    });
};

/**
 * Permet de supprimer un commentaire !
 */
exports.deleteCommentaire = (req, res, next) => {
    db.query(`DELETE FROM commentaire WHERE id=${req.body.id} LIMIT 1`, (err, result) => {
        if (err) throw err;

        res.status(200).json({ message: 'Commentaire supprimer !' });
    });
};

/**
 * Permet de modifier un commentaire !
 */
exports.editCommentaire = (req, res, next) => {
    db.query(`UPDATE commentaire SET content="${req.body.content}" WHERE id=${req.body.id} LIMIT 1`, (err, result) => {
        if (err) throw err;

        res.status(200).json({ message: 'Commentaire Modifier !' });
    })
};