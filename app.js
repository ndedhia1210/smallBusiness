var express = require("express");
var app = express();

const PORT = process.env.PORT || 3000


app.get("/", (req, res, next) => {
    res.json("Welcome to our web-service environment!");
});


app.get("/products", (req, res, next) => {
    require('./app/database.js').getDb().collection('product').find().toArray()
    .then( 
        (products) => { res.json(products) },
        (error) => { 
            console.log("Failed to fetch products!");  
            res.send(error);
        }
    )
});


// Making connection to Mongo and then listening on PORT
const run = async() => {
    try {
        await require('./app/database.js').connect();
        app.listen(PORT, () => {
            console.log("listening for requests");
        })
    } catch (error) {
        console.error(error); 
        return false;
    }
}

run();