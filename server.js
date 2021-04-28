// Dependencies

const express = require('express');
const path = require('path');

// Sets up the Express App

const app = express();
const PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)

const tables = [
  {
    customerName: 'Ahmed',
    customerEmail: 'afhaque89@gmail.com',
    customerID: 'afhaque89',
    phoneNumber: '979-587-0887'
  }
];
const waitlist = [
  {
    customerName: 'Saima',
    customerEmail: 'saima@gmail.com',
    phoneNumber: '979-587-0887',
    customerID: 'saimacool'
  }
];

// Routes

// Basic route that sends the user first to the AJAX Page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'home.html')));

app.get('/tables', (req, res) =>
  res.sendFile(path.join(__dirname, 'tables.html'))
);
app.get('/reserve', (req, res) =>
  res.sendFile(path.join(__dirname, 'reserve.html'))
);

// Displays all characters
app.get('/api/tables', (req, res) => res.json(tables));
app.get('/api/waitlist', (req, res) => res.json(waitlist));

app.post('/api/tables', (req, res) => {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  const newTable = req.body;

  console.log(newTable);
  if (tables.length > 4) {
    waitlist.push(newTable);
  } else {
    tables.push(newTable);
  }
  res.json(true);
});

// app.post('/api/waitlist', (req, res) => {
//   const waitlistList = req.body;
//   //   console.log(newWaitlist);
//   //   waitlist.push(newWaitlist);
//   res.json(waitlistList);
// });

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));
