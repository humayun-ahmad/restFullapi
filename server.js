// get dependencies
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;
const app = express();


// parse requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Enable CORS for all HTTP methods
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

// Configuring the database
const config = require('./config.js');
const mongoose = require('mongoose');
require('./product.routes.js')(app);

mongoose.Promise = global.Promise;

// Connecting to the database
const DB = 'mongodb+srv://rajib:manikrajib@mongodb01-7a023.mongodb.net/Test?retryWrites=true&w=majority';

mongoose.connect(DB, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// default route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Humayun Product app"});
});

// listen on port 3000
app.listen(PORT, () => {
    console.log("Server is listening on port 5000");
});