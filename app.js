var express = require("express");
var app = express();
const PORT = process.env.PORT || 3000

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = process.env.MONGO_CONNECTION_STRING;
console.log(uri);
// const uri = "mongodb+srv://ndedhia1210:mEVnUzSEUc98KdpO@smallbusinesses.qj2ldxf.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let productdb;

function run() {
    client.connect()
    .then(
        (connection) => {
            let conn = connection;
            productdb = conn.db("small-business").collection('product');
            console.log("Connected successfully to server");

            app.listen(PORT, () => {
                console.log("listening for requests");
            })
        }
    )
    .catch((error) => {
        console.error(error); 
        return false;
    });
}

run();

app.get("/", (req, res, next) => {
    res.json("Welcome to our web-service environment!");
});

app.get("/test", (req, res, next) => {
 res.json(["Test1", "Test2"]);
});

app.get("/products", (req, res, next) => {
    productdb.find().toArray()
    .then( 
        (products) => { res.json(products) },
        (error) => { 
            console.log("Failed to fetch products!");  
            res.send(error);
        }
    )
});

app.get('/product/:id', function(req, res, next){
    productdb.find({_id: new ObjectId(req.params.id)}).toArray()
    .then( 
        (product) => { res.json(product) },
        (error) => { 
            console.log("Failed to fetch product!");
            res.send(error);
        }
    )
});

app.post('/product', function(req, res, next){
    var product = req.body;
    if(!product || !product.productName || !product.quantity) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    }
    productdb.insertOne({name: product.productName, quantity: product.quantity})
    .then( 
        (product) => { res.json(product) },
        (error) => { 
            console.log("Failed to add product!");
            res.send(error);
        }
    )
});

// app.listen(3000, () => {
//     console.log("Server running on port 3000");
// });
