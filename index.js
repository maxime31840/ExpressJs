const { occurence } = require('./occurence.js');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});



app.post('/traitement', (req, res) => {
    let chaine1 =  req.body.chaine1;
    let caractere = req.body.caractere;
    let resultat = occurence(chaine1, caractere);
    res.send({resultat});
})

app.listen(3000);