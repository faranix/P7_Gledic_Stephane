// Import des dependances 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../service/db');
const passwordValidator = require('password-validator');

// Creation d'un schema de mot de passe
let passwordCheck = new passwordValidator();

passwordCheck
.is().min(4)

/**
 * Permet de crée un nouveau compte
 */
exports.userSingup = (req, res, next) => {

    console.log(req.body);

    if (passwordCheck.validate(req.body.password)) {
        // Stock les données rentré par utilisateur !
        const user = req.body;
    
        // Avoir la longeur de l'objet (La verification des champs ce fait dans le frontend).
        const userLength = Object.keys(user).length;
    
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
    } else {
        res.status(401).json({ message: 'Votre mot de passe doit avoir minimum 4 caractères !' });
    }
};

/**
 * Permet de ce connecter a un profile 
 */
exports.userLogin = (req, res, next) => {
    db.query(`SELECT * FROM user WHERE email = "${req.body.email}"`, (err, result) => {
        if(err) throw err;
        
        if (req.body.email == '' || result.length == 0) {
            console.log('Email Incorrect !');
            res.status(400).json({ message: 'Email Incorrect !' });
        } else {
            const userData = {
                id: result[0].id,
                pseudo: result[0].pseudo,
                isAdmin: result[0].isAdmin
            };
            console.log(userData);
            if (userData != undefined) {
                // Comparer le mot de passe de la requete et celui de la base de données
                bcrypt.compare(req.body.password, result[0].password)
                    .then(valid => {
                        if (!valid) {
                            console.log('Mot de passe incorrect !');
                            return res.status(400).json({message: 'Mot de passe incorrect !'});
                        }
                        console.log('Utilisateur connecter !');
                        return res.status(200).json({
                            // A modifier
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
            } 
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

        console.log('Tout les commentaires de user sont supprimer !');

        // Supprime tout les posts lié a cette utilisateur !
        db.query(`SELECT post.* FROM user INNER JOIN post ON user.id = user_id WHERE user.id=${req.body.userId}`, (err, result) => {
            if (err) throw err;

            result.forEach(element => {
                db.query(`SELECT commentaire.* FROM post INNER JOIN commentaire ON post.id = post_id WHERE post_id=${element.id}`, (err, result) => {
                    if (err) throw err;    

                    // Supprime tout les commentaires sur les posts de user
                    if (result) {
                        result.forEach(element => {
                            db.query(`DELETE FROM commentaire WHERE commentaire.id=${element.id}`, (err, result) => {
                                if (err) throw err;
    
                                console.log('Tout les commentaires sur les posts de user sont supprimer !');
                            });
                        });
                    }
                    
                    // Supprime tout les posts de user
                    db.query(`DELETE FROM post WHERE user_id=${req.body.userId}`, (err, result) => {
                        if (err) throw err;
                        
                        console.log('Tout les posts de user sont supprimer !');
                    
                        // Supprime tout le profil de l'utilisateur !
                        db.query(`DELETE FROM user WHERE user.id=${req.body.userId}`, (err, result) => {
                            if (err) throw err;

                            res.status(200).json({ message: 'Utilisateur supprimer !' });

                        });
                    });
                });
            });
        });
    });
};

// EN COURS 
/**
 * Permet de changer l'image d'un user
 */
exports.changeImage = (req, res, next) => {

    console.log('log 1:', req.body);
    console.log('log 2:', req.files);

    res.status(200).json({message: 'test'});

    /*
   const fileNameOriginal = req.body.name;
   const newFileName = fileNameOriginal.split(' ').join('_');

   db.query(`UPDATE user SET picture="${newFileName}" WHERE id=${req.body.userId} LIMIT 1`, (err, result) => {
       if (err) throw err;

       res.status(200).json({ message: 'Photo Modofier !' });
   })
   */
}