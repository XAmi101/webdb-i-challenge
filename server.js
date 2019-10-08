const express = require('express');

// const db = require('./data/dbConfig.js');
const AccountRouter = require('./AccountRouter')

const server = express();

server.use(express.json());

server.use('/api/accounts', AccountRouter);

server.get('/', (req, res) => {
    res.send('<h3>here we Go!</h3>');
  });

module.exports = server; 