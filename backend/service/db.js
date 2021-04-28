const mysql = require('mysql');

// Creation de la connexion avec la base de données
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'P7_openclassrooms',
    port: '8889'
});

// Connecter la base de données
db.connect((err) => {
    if (err) throw err;
    console.log('Connecter');
});


module.exports = db;