// Import des dependances 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../service/db');
const storage = require('node-sessionstorage');

// Controllers pour inscription d'un user dans la base de données !
exports.usersSingup = (req, res, next) => {
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
            db.query(`INSERT INTO user(email, password, pseudo) VALUES ('${req.body.email}', '${hash}', '${req.body.pseudo}');`, (err, result) => {
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

// Controllers pour la connection d'un utilisateur !
exports.usersLogin = (req, res, next) => {
    db.query(`SELECT * FROM user`, (err, result) => {
        if(err) throw err;

        // Creation d'une variable user qui va stocker les données de l'utilisateur 
        let user = null;

        // Boucle qui parcours la table
        result.forEach(element => {      
            
            // Trouve l'utilisateur dans la base de données
            if (element.email === req.body.email) {
                // Stocker les données de utilisateur 
                user = element;
                // Comparer le mot de passe de la requete et celui de la base de données
                bcrypt.compare(req.body.password, user.password)
                    .then(valid => {
                        if (!valid) {
                            console.log('Mot de passe incorrect !');
                            return res.status(400).json({message: 'Mot de passe incorrect !'});
                        }
                        console.log('Utilisateur connecter !');
                        return res.status(200).json({
                            userId: user.id,
                            // Creation du token
                            token: jwt.sign(
                                {userId: user.id},
                                `${process.env.KEYTOKEN}`,
                                { expiresIn: '24h' }
                            )
                        });
                    })
                    .catch(error => res.status(400).json({ error }));
            } 
        });

        // Si aucun utilisateur trouver
        if (user == null) {
            res.status(400).json({ message: 'Email Introuvable !' });
        }
    });
};

// Récuperation des informations de user quand il est connecter 
exports.userConnected = (req, res, next) => {
    // Recuperation de userId
    const userId = jwt.decode(req.headers.authorization.split(' ')[1]).userId;

    db.query(`SELECT * FROM user WHERE id='${userId}'`, (err, result) => {
        if (err) throw err;

        if (result != null || result != undefined) {
            // Stocker les données que on veut envoyer
           const userData = {
            email: result[0].email,
            id: result[0].id,
            pseudo: result[0].pseudo
           };

           // Envoyer les données
           res.status(200).json(userData);
        } else {
            res.status(400).json({message: 'Une erreur est survenue !'})
        }
    })
};