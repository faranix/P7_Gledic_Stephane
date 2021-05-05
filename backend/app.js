// Import 
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Les Routes
const userRouter = require('./routers/user');
const postRouter = require('./routers/post');
const commentaireRouter = require('./routers/commentaire');

// Parser les requetes
app.use(bodyParser.json());

// Les access au headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


app.use('/api', userRouter);
app.use('/api/connect', postRouter);
app.use('/api/commentaire', commentaireRouter);

module.exports = app;