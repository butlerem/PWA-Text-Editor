const path = require('path');
const express = require('express');
const router = express.Router();

router.get('/example', (req,res) => {
  res.send('Example API route');
});

module.exports = router;

module.exports = (app) =>
  app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '../client/dist/index.html'))
  );