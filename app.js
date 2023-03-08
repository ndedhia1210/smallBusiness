var express = require("express");
var app = express();

app.get("/", (req, res, next) => {
    res.json("Welcome to our web-service environment!");
});

app.get("/test", (req, res, next) => {
 res.json(["Test1", "TEst2"]);
});

app.get("/products", (req, res, next) => {
    res.json(["Prod1", "Prod2"]);
   });

app.listen(3000, () => {
 console.log("Server running on port 3000");
});
