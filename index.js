const { timeStamp } = require('console');
const { occurence } = require('./occurence.js');
const express = require('express');
const app = express();
const path = require('path');
const { Sequelize } = require('sequelize');
// Sequelize Part 
const sequelize = new Sequelize('sqlite::memory:');

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// Express Part
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});


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
    technician_response : "Thank you",
    priority: "critical",
    status: "assigned"
  }

  const regexId = /[0-9]+/g;

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

// Root for all tickets 
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

app.post('/create-ticket' , (req, res) => {
    let ticket = {
        title : req.body.title,
        message: req.body.message,
        priority: req.body.priority,
        email : req.body.email, 
        status : req.body.status

    };

    let errors = [];

    for (elem in ticket) {
      if (elem == null) {
        errors[elem] = `${elem} not defined`;
      }
    }

    if (errors.length != 0 ) {
      return res.status(400).send({
        message: "Forms not complete"
      });
    }

    // create ticket 
    // const ticket = await ticket.create

    return res.status(200).send({
      data: ticket
    });
}) 

app.put('/modifier-ticket/:id', async (req, res) => {
  const id = req.params.id;
  const updates = req.body;

  if (!regexId.test(id)) {
    return res.status(400).send({ 
      message: "Invalid ticket ID" 
    });
  }

  // const ticket = await Ticket.findByPk(id);
  // if (!ticket) return res.status(404).send({ 
  // message: "Ticket not found" 
  // });

  // await ticket.update(updates);

  return res.status(200).json({
    message: `Ticket ${id} updated successfully`,
    updates
  });
});




app.post('/traitement', (req, res) => {
    let chaine1 =  req.body.chaine1;
    let caractere = req.body.caractere;
    let resultat = occurence(chaine1, caractere);
    res.send({resultat});
})

app.listen(3000);
// sequelize.close()