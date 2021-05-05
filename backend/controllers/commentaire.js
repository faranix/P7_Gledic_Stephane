// Import de la base de données
const db = require('../service/db');


// Poster un commentaire 
exports.postCommentaire = (req, res, next) => {
    db.query(`INSERT INTO commentaire(content, user_id, post_id) VALUES ("${req.body.content}", ${req.body.userId}, ${req.body.postId})`, (err, result) => {
        if (err) throw err;

        res.status(201).json({ message: 'Commentaire poster !' });
    })
}

// Permet D'afficher les commentaires
exports.getCommentaire = (req, res, next) => {

    db.query(`SELECT commentaire.*, user.pseudo FROM commentaire INNER JOIN user ON user_id = user.id`, (err, result) => {
        if (err) throw err;

        res.status(200).json(result);
    })
}