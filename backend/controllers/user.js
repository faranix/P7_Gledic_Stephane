// Import des dependances 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../service/db');

/**
 * Permet de crée un nouveau compte
 */
exports.userSingup = (req, res, next) => {
    // Stock les données rentré par utilisateur !
    const user = req.body;
    console.log(user);
    // Avoir la longeur de l'objet (La verification des champs ce fait dans le frontend).
    const userLength = Object.keys(user).length;
    console.log(userLength);
    // Verifie que tout les champs sont bien remplie !
    if (userLength === 3) {
        // On crypte le mot de passe 10 fois
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            // On crée un nouveau utilisateur dans la base de données
            db.query(`INSERT INTO user(email, password, pseudo) VALUES ("${req.body.email}", "${hash}", "${req.body.pseudo}");`, (err, result) => {
                if (err) throw err;
                console.log('post réussi');
            });
            res.status(201).json({ message: 'Utilisateur Crée !' });
        })
        .catch(error => res.status(400).json({ error }));
    } else {
        res.status(401).json({ message: 'Veuillez remplir tout les champs !' });
    }
};

/**
 * Permet de ce connecter a un profile 
 */
exports.userLogin = (req, res, next) => {
    db.query(`SELECT * FROM user WHERE email = "${req.body.email}"`, (err, result) => {
        if(err) throw err;

        const userData = result[0];
            
        if (userData != null) {
            // Comparer le mot de passe de la requete et celui de la base de données
            bcrypt.compare(req.body.password, userData.password)
                .then(valid => {
                    if (!valid) {
                        console.log('Mot de passe incorrect !');
                        return res.status(400).json({message: 'Mot de passe incorrect !'});
                    }
                    console.log('Utilisateur connecter !');
                    return res.status(200).json({
                        user: userData,
                        // Creation du token
                        token: jwt.sign(
                            {userId: userData.id},
                            `${process.env.KEYTOKEN}`,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(400).json({ error }));
        } else {
            res.status(400).json({message: 'Email incorrect !'});
        }
    });
};

/**
 * Permet de récuperer les informations du profil connecter 
 */
exports.userConnected = (req, res, next) => {
        res.status(200).json({message: 'Données récupérer'});
};

/**
 * Permet de supprimer le compte
 */
exports.deleteAccount = (req, res, next) => {
    // Supprime tout les commentaires lié a cette utilisateur !
    db.query(`DELETE FROM commentaire WHERE user_id=${req.body.userId}`, (err, result) => {
        if (err) throw err;

        // Supprime tout les posts lié a cette utilisateur !
        db.query(`DELETE FROM post WHERE user_id=${req.body.userId}`, (err, result) => {
            if (err) throw err;

            // Supprime tout le profil de l'utilisateur !
            db.query(`DELETE FROM user WHERE user.id=${req.body.userId}`, (err, result) => {
                if (err) throw err;
                
                res.status(200).json({ message: 'Utilisateur supprimer !' });
            })
        })
        
    })
};