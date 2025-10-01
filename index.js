const { occurence } = require('./occurence.js');
const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

app.use(express.json());

variable = occurence("J'aime les frites et les hamburgers", "e");

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

router.get('./', async (req, res) => {
  const get = await get.create({
    chaine1: req.body.chaine1,
    caractere: req.body.caractere,
  })
})

app.listen(3000);