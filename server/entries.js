const express = require('express');
const connection = require('./connection');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.get('/', (req, res, next) => {
  connection.query('SELECT * FROM entries', (err, rows, next) => {
    if (err) return next(err);
    if (rows === undefined) {
      res.send('No entries exist on this day');
    }
    res.status(200).json(rows);
  });
});

router.get('/today', (req, res, next) => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '-' + mm + '-' + dd;
  connection.query('SELECT * FROM entries WHERE entryTime LIKE ?', today + '%', (err, rows, next) => {
    if (err) return next(err);
    if (rows === undefined) {
      res.send('No entries exist');
    }
    res.status(200).json(rows);
  });
});

router.get('/:id', (req, res, next) => {
  connection.execute('SELECT * FROM entries WHERE entryID = ?', [req.params.id], (err, rows, next) => {
    if (err) return next(err);
    if (rows[0] === undefined) {
      res.send('Entry specified does not exist');
    }
    res.json(rows[0]);
  });
});

router.post('/', jsonParser, (req, res, next) => {
  let entryParams = [req.body.entryName, req.body.entryPrice, req.body.entryUnits];
  connection.execute('INSERT INTO entries (entryID, entryName, entryPrice, entryUnits, entryTime) VALUES (NULL, ?, ?, ?, CURRENT_TIMESTAMP);', entryParams, (err, rows, next) => {
    if (err) return next(err);
    res.status(200).json(rows);
  });
});

router.delete('/:id', (req, res, next) => {
  connection.execute('DELETE FROM entries WHERE entryID = ' + req.params.id, (err, rows, next) => {
    if (err) return next(err);

    req.on('error', function (err) {
      if (err) return next(err);
    });
    res.status(200);
  });
});

router.get('/day/:date', (req, res, next) => {
  connection.query('SELECT * FROM entries WHERE entryTime LIKE ?', req.params.date + '%', (err, rows, next) => {
    if (err) return next(err);
    req.on('error', function (err) {
      if (err) return next(err);
    });
    res.json(rows);
  });
});

module.exports = router;
