const { MongoClient, ServerApiVersion } = require('mongodb');

// Reads MONGO_CONNECTION_STRING form environment variable
// This is nothing but Mongo URI helps to connect to Mongo.
const uri = process.env.MONGO_CONNECTION_STRING;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

// Singleton DB Object
let db;

module.exports = {
    // Connect is a async function which will try to generate 
    // connection with Mongo and store connection in DB Object
    // which can be used by any api for extracting data.
    async connect() {
        try {
            const connection = await client.connect();
            let conn = connection;
            db = conn.db("small-business");
            console.log("Connected successfully to server");
            return db;
        } catch(error) {
            console.error(error); 
            throw error;
        };
      },

    // GetDB() function returns the singleTon db object which can 
    // be used by every controller. 
    // TODO: Change singleton pattern to Factory pattern to 
    // prevent data leakage from continuously open connection. 
    getDb() {
      return db;
    }
};