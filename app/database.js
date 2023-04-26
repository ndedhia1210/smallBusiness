const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_CONNECTION_STRING;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let db;

module.exports = {
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

    getDb() {
      return db;
    }
};