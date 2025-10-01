const { occurence } = require('./occurence.js');
const express = require('express');
const app = express();

app.use(express.json());

variable = occurence("J'aime les frites et les hamburgers", "e");
console.log(variable);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(3000);