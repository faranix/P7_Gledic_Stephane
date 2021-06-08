// Import de la base de données
const db = require('../service/db');


/**
 * Permet de poster un commentaire !
 */
exports.postCommentaire = (req, res, next) => {
    let inserts = [
        req.body.content,
        req.body.userId,
        req.body.postId
    ];

    db.query(`INSERT INTO commentaire(content, user_id, post_id) VALUES (?, ?, ?)`, inserts, (err, result) => {
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
    let inserts = [
        req.body.id
    ];

    db.query(`DELETE FROM commentaire WHERE id=? LIMIT 1`, inserts, (err, result) => {
        if (err) throw err;

        res.status(200).json({ message: 'Commentaire supprimer !' });
    });
};

/**
 * Permet de modifier un commentaire !
 */
exports.editCommentaire = (req, res, next) => {
    let insertsUpdate = [
        req.body.content,
        req.body.id
    ];

    db.query(`UPDATE commentaire SET content=? WHERE id=? LIMIT 1`, insertsUpdate, (err, result) => {
        if (err) throw err;

        let insertsSelect = [
            req.body.id
        ];

        db.query(`SELECT commentaire.*, user.pseudo FROM commentaire INNER JOIN user ON user_id = user.id WHERE commentaire.id=?`, insertsSelect, (err, result) => {
            if (err) throw err;

            res.status(200).json(result);
        })
    });
};

