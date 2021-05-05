const jwt = require('jsonwebtoken');

/**
 * Vérifie le token
 */
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodeToken = jwt.verify(token, `${process.env.KEYTOKEN}`);
        const userId = decodeToken.userId;

        // Verifie que userId est identique a celui de la requete
        if (req.body.userId && req.body.userId != userId) {
            throw 'User Id incorrect !';
        } else {
            next();
        }
    } catch {
        res.status(401).json({ message: 'Requete non authentifié !'});
    }
}
