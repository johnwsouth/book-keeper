require('dotenv/config');
const express = require('express');
const path = require('path');
const connection = require('./connection');
const entries = require('./entries');
const bodyParser = require('body-parser');

const server = express();
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
let PORT = process.env.PORT;

connection.connect();

server.use('/api/entries', entries);
server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

server.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error has occurred'
  });

});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log('It\'s listening closely\n');
});
