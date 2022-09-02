// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Additional Packages and variables
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 4202

function printing(){
    console.log(`Server is running on port: ${port}`);
};

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

//Setup Server
const server = app.listen(port, printing);

//GET request

app.get('/all_data', sendData)

function sendData (req, res) {
    res.send(projectData)
}

// POST route
app.post('/added_data', addData)

// Creates key value pair for each variable

function addData(req, res) {
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.user_response = req.body.user_response;
    projectData.city = req.body.city;
    res.end();
    console.log(projectData)
}
