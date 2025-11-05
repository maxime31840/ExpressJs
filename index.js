const { timeStamp } = require('console');
const { occurence } = require('./occurence.js');
const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

const regexId = /[0-9]+/g;
//test de ticket
const ticket = {
    id: 1,
    created_at: 1762350400,
    updated_at: 1762350400,
    responded_at: 1762350400,
    closed_at: 1762350400,
    requester_id: 1,
    technician_id: 1,
    message: "bienvenue chez los poyos hermanos",
    technician_id: "Thank you",
    priority: "critical",
    status: "assigned"
  }

app.get('/ticket/:id', (req, res) => {
  //Récup le ticket avec l'id demandé à la bdd
  //renvoyer le ticket
  let idTicket = req.params.id;
  if(idTicket.match(regexId) == null) {
    return res.status(400).send({
      message: "Type of id should be an int"
    });
  }
  
  
  //const ticket = await Ticket.findByPk(id);
  //let response = ticket
  return res.status(200).send({
    ticket: ticket.id,
    data: ticket
  });
})

app.get('/tickets', (req, res) =>{
  let tickets = [ticket];
  if(tickets.length === 0) {
    return res.status(200).send({
      message: "There is no tickets"
    });
  }

  //const tickets = await tickets.findAll
  return res.status(200).send({
    data: tickets
  });
})



app.post('/traitement', (req, res) => {
    let chaine1 =  req.body.chaine1;
    let caractere = req.body.caractere;
    let resultat = occurence(chaine1, caractere);
    res.send({resultat});
})

app.listen(3000);