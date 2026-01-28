const express = require('express');
const app = express();
const path = require('path');
const sequelize = require('./src/config/databaseConnect');
const Ticket = require('./src/models/Ticket');

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connected to the DataBase !");
  } catch (err) {
    console.error("DataBase fail:", err);
  }
})();

// Express Part
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});


// Regex for ID validation
const regexId = /^[0-9]+$/;



// Root for a single ticket

app.get('/ticket/:id', async (req, res) => {
  const id = req.params.id;

  // Validation stricte de l’ID
  if (!regexId.test(id)) {
    return res.status(400).json({
      message: "Ticket ID must be a valid integer"
    });
  }

  try {
    // Récupération depuis Sequelize
    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      return res.status(404).json({
        message: `Ticket ${id} not found`
      });
    }

    return res.status(200).json({
      data: ticket
    });

  } catch (error) {
    console.error("Error fetching ticket:", error);

    return res.status(500).json({
      message: "Internal server error"
    });
  }
});



// Root for all tickets 
app.get('/tickets', async (req, res) => {
  try {
    // Récupération depuis Sequelize
    const tickets = await Ticket.findAll();

    if (tickets.length === 0) {
      return res.status(200).json({
        message: "There are no tickets"
      });
    }

    return res.status(200).json({
      data: tickets
    });

  } catch (error) {
    console.error("Error fetching tickets:", error);
    return res.status(500).json({
      message: "Internal server error"
    });
  }
});



// Root to create a ticket
app.post('/create-ticket' , async (req, res) => {
    let createdTicket = {
        title : req.body.title,
        message: req.body.message,
        priority: req.body.priority,
        email : req.body.email, 
        status : req.body.status
    };

    let errors = [];

    for (elem in createdTicket) {
      if (createdTicket[elem] == null) {
        errors[elem] = `${elem} not defined`;
      }
    }

    if (errors.length != 0 ) {
      return res.status(400).send({
        message: "Forms not complete"
      });
    }

    const ticket = await Ticket.create(createdTicket);

    return res.status(201).send({
      data: ticket
    });
}) 




// Root to update a ticket
app.put('/modifier-ticket/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedFields = req.body;

    if (!regexId.test(id)) {
      return res.status(400).send({ 
        message: "Invalid ticket ID" 
      });
    }

    const ticket = await Ticket.findByPk(id);
    if (!ticket) return res.status(404).send({ 
    message: "Ticket not found" 
    });

    await ticket.update(updatedFields);

    return res.status(200).json({
      message: `Ticket ${id} updated successfully`,
      updatedFields
    });
  }catch(err){
    console.log(err);
  }
  
});



// Root to delete a ticket
app.delete('/delete-ticket/:id', async (req, res) => {
  const id = req.params.id;

  // Vérification ID
  if (!regexId.test(id)) {
    return res.status(400).json({
      message: "Ticket ID should be an integer"
    });
  }

  try {
    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      return res.status(404).json({
        message: `Ticket with ID ${id} not found`
      });
    }

    await ticket.destroy();

    return res.status(200).json({
      message: `Ticket ${id} has been deleted successfully`
    });

  } catch (error) {
    console.error("Error deleting ticket:", error);
    return res.status(500).json({
      message: "Internal server error during ticket deletion"
    });
  }
});


app.listen(3000);
// sequelize.close()