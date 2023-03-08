var express = require("express");
var app = express();

app.get("/sample", (req, res, next) => {
 res.json(["Niraj", "Vaibhav"]);
});

app.listen(3000, () => {
 console.log("Server running on port 3000");
});
