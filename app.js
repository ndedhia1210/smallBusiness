var express = require("express");
var app = express();

// For parsing application/json payload
app.use(express.json());

// Home page - test
app.get("/", (req, res, next) => {
    res.json("Welcome to KiranaShop backend environment!");
});

// Binding routes to express app
require('./app/user/routes')(app);
require('./app/category/routes')(app);
require('./app/auth/routes')(app);

// PORT value will be extracted from environment variable 
// If not set then it will run on default port i.e. 3000
const PORT = process.env.PORT || 3000

// Making connection to Mongo and then listening on PORT
const startServer = async() => {
    try {
        // As a part of deployment we need to first make sure Mongo
        // connection is made inorder to create singleton db object
        await require('./app/database.js').connect();

        // Spinup server once Mongo connection is successful
        app.listen(PORT, () => {
            console.log(`Node server started on ${PORT}`);
        })
    } catch (error) {
        console.error(error); 
        return false;
    }
}

// Requesting to start the server once 
// app is initialized and routing is setup.
startServer();