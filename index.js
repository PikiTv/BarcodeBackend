// ***************************************************************************
// Bank API code from Web Dev For Beginners project
// https://github.com/microsoft/Web-Dev-For-Beginners/tree/main/7-bank-project/api
// ***************************************************************************

/*
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const crypto = require('crypto');
const pkg = require('./package.json');


// App constants
const port = process.env.PORT || 3000;
const apiPrefix = '/api';

// Store data in-memory, not suited for production use!
const db = {
    test: {
      user: 'test',
      currency: '$',
      description: `Test account`,
      balance: 75,
      transactions: [
        { id: '1', date: '2020-10-01', object: 'Pocket money', amount: 50 },
        { id: '2', date: '2020-10-03', object: 'Book', amount: -10 },
        { id: '3', date: '2020-10-04', object: 'Sandwich', amount: -5 }
      ],
    },
    jondoe: {
        user: 'jondoe',
        currency: '$',
        description: `Second test account`,
        balance: 150,
        transactions: [
          { id: '1', date: '2022-10-01', object: 'Gum', amount: -2 },
          { id: '2', date: '2022-10-03', object: 'Book', amount: -10 },
          { id: '3', date: '2022-10-04', object: 'Restaurant', amount: -45 }
        ],
      }
  
  };
  
// Create the Express app & setup middlewares
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: /http:\/\/(127(\.\d){3}|localhost)/}));
app.options('*', cors());

// ***************************************************************************

// Configure routes
const router = express.Router();

// Hello World for index page
app.get('/', function (req, res) {
    return res.send("Hello World!");
})

app.get('/api', function (req, res) {
    return res.send("Fabrikam Bank API");
})
  
// ----------------------------------------------
  // Create an account
router.post('/accounts', (req, res) => {
    // Check mandatory request parameters
    if (!req.body.user || !req.body.currency) {
      return res.status(400).json({ error: 'Missing parameters' });
    }
  
    // Check if account already exists
    if (db[req.body.user]) {
      return res.status(409).json({ error: 'User already exists' });
    }
  
    // Convert balance to number if needed
    let balance = req.body.balance;
    if (balance && typeof balance !== 'number') {
      balance = parseFloat(balance);
      if (isNaN(balance)) {
        return res.status(400).json({ error: 'Balance must be a number' });  
      }
    }
  
    // Create account
    const account = {
      user: req.body.user,
      currency: req.body.currency,
      description: req.body.description || `${req.body.user}'s budget`,
      balance: balance || 0,
      transactions: [],
    };
    db[req.body.user] = account;
  
    return res.status(201).json(account);
  });
  
// ----------------------------------------------

// Get all data for the specified account
router.get('/accounts/:user', (req, res) => {
    const account = db[req.params.user];
  
    // Check if account exists
    if (!account) {
      return res.status(404).json({ error: 'User does not exist' });
    }
  
    return res.json(account);
  });
  
  // ----------------------------------------------
  
// Remove specified account
router.delete('/accounts/:user', (req, res) => {
    const account = db[req.params.user];
  
    // Check if account exists
    if (!account) {
      return res.status(404).json({ error: 'User does not exist' });
    }
  
    // Removed account
    delete db[req.params.user];
  
    res.sendStatus(204);
  });
  
  // ----------------------------------------------
  
  // Add a transaction to a specific account
  router.post('/accounts/:user/transactions', (req, res) => {
    const account = db[req.params.user];
  
    // Check if account exists
    if (!account) {
      return res.status(404).json({ error: 'User does not exist' });
    }
  
    // Check mandatory requests parameters
    if (!req.body.date || !req.body.object || !req.body.amount) {
      return res.status(400).json({ error: 'Missing parameters' });
    }
  
    // Convert amount to number if needed
    let amount = req.body.amount;
    if (amount && typeof amount !== 'number') {
      amount = parseFloat(amount);
    }
  
    // Check that amount is a valid number
    if (amount && isNaN(amount)) {
      return res.status(400).json({ error: 'Amount must be a number' });
    }
  
    // Generates an ID for the transaction
    const id = crypto
      .createHash('md5')
      .update(req.body.date + req.body.object + req.body.amount)
      .digest('hex');
  
    // Check that transaction does not already exist
    if (account.transactions.some((transaction) => transaction.id === id)) {
      return res.status(409).json({ error: 'Transaction already exists' });
    }
  
    // Add transaction
    const transaction = {
      id,
      date: req.body.date,
      object: req.body.object,
      amount,
    };
    account.transactions.push(transaction);
  
    // Update balance
    account.balance += transaction.amount;
  
    return res.status(201).json(transaction);
  });
  
  // ----------------------------------------------
  
  // Remove specified transaction from account
  router.delete('/accounts/:user/transactions/:id', (req, res) => {
    const account = db[req.params.user];
  
    // Check if account exists
    if (!account) {
      return res.status(404).json({ error: 'User does not exist' });
    }
  
    const transactionIndex = account.transactions.findIndex(
      (transaction) => transaction.id === req.params.id
    );
  
    // Check if transaction exists
    if (transactionIndex === -1) {
      return res.status(404).json({ error: 'Transaction does not exist' });
    }
  
    // Remove transaction
    account.transactions.splice(transactionIndex, 1);
  
    res.sendStatus(204);
  });
  
// ***************************************************************************

// Add 'api` prefix to all routes
app.use(apiPrefix, router);

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
  
*/

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

// App-Konstanten
const port = process.env.PORT || 3000;
const apiPrefix = '/api';
const dataFilePath = 'data.json'; // Der Dateipfad, in dem Ihre Daten gespeichert sind

// Erstellen Sie eine Funktion zum Lesen der Daten aus der Datei
const readDataFromFile = () => {
    try {
        const data = fs.readFileSync(dataFilePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return {}; // Geben Sie ein leeres Objekt zurück, wenn die Datei nicht existiert oder ein Fehler auftritt
    }
}

// Erstellen Sie eine Funktion zum Schreiben der Daten in die Datei
const writeDataToFile = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

// Erstellen Sie die Express-App und konfigurieren Sie Middleware
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: /http:\/\/(127(\.\d){3}|localhost)/ }));
app.options('*', cors());

// Konfigurieren Sie die API-Routen

// Erstellen eines Kontos
app.post('/api/accounts', (req, res) => {
    const accountsData = readDataFromFile();
    // Implementieren Sie die Logik zum Erstellen eines Kontos und schreiben Sie die Daten zurück in die Datei.
    // Zum Beispiel:
    const { user, currency, description, balance } = req.body;
    accountsData[user] = {
        user,
        currency,
        description: description || `${user}'s budget`,
        balance: balance || 0,
        transactions: []
    };
    writeDataToFile(accountsData);
    res.status(201).json(accountsData[user]);
});

// Abrufen von Kontodetails
app.get('/api/accounts/:user', (req, res) => {
    const accountsData = readDataFromFile();
    const account = accountsData[req.params.user];

    if (!account) {
        return res.status(404).json({ error: 'User does not exist' });
    }

    return res.json(account);
});

// Löschen eines Kontos
app.delete('/api/accounts/:user', (req, res) => {
    const accountsData = readDataFromFile();
    const account = accountsData[req.params.user];

    if (!account) {
        return res.status(404).json({ error: 'User does not exist' });
    }

    delete accountsData[req.params.user];
    writeDataToFile(accountsData);

    res.sendStatus(204);
});

// Fügen Sie eine Transaktion zu einem Konto hinzu
app.post('/api/accounts/:user/transactions', (req, res) => {
    const accountsData = readDataFromFile();
    const account = accountsData[req.params.user];

    if (!account) {
        return res.status(404).json({ error: 'User does not exist' });
    }

    // Implementieren Sie die Logik zum Hinzufügen einer Transaktion und schreiben Sie die Daten zurück in die Datei.
    // Zum Beispiel:
    const { date, object, amount } = req.body;
    const transaction = {
        id: /* Generieren Sie eine eindeutige ID */
        date,
        object,
        amount
    };
    account.transactions.push(transaction);
    account.balance += transaction.amount;
    writeDataToFile(accountsData);

    res.status(201).json(transaction);
});

// Entfernen Sie eine bestimmte Transaktion aus einem Konto
app.delete('/api/accounts/:user/transactions/:id', (req, res) => {
    const accountsData = readDataFromFile();
    const account = accountsData[req.params.user];

    if (!account) {
        return res.status(404).json({ error: 'User does not exist' });
    }

    const transactionIndex = account.transactions.findIndex(
        (transaction) => transaction.id === req.params.id
    );

    if (transactionIndex === -1) {
        return res.status(404).json({ error: 'Transaction does not exist' });
    }

    account.transactions.splice(transactionIndex, 1);
    account.balance -= account.transactions[transactionIndex].amount;
    writeDataToFile(accountsData);

    res.sendStatus(204);
});

// Fügen Sie das API-Präfix zu allen Routen hinzu
app.use(apiPrefix, router);

// Starten Sie den Server
app.listen(port, () => {
    console.log(`Server hört auf Port ${port}`);
});