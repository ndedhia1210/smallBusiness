function createProductSchema() {
    console.log("Trying to connect DynamoDb and testing!....")
    const CyclicDb = require("@cyclic.sh/dynamodb")
    const db = CyclicDb("ill-gold-parrot-sockCyclicDB")

    const product = db.collection("Product");

    // product.set("product1", {
    //     name: "Cashew",
    //     amount: "220"
    // }).then((response) => console.log(response))
    // .catch((e) => {console.error("Error creating Leo " + e)})

    // product.get("product1")
    // .then((response) => console.log(response))
    // .catch((e) => {console.error("Could not fetch product!" + e)})

    // product.delete("product1")
    // .then((response) => console.log(response))
    // .catch((e) => {console.error("Could not remove product!" + e)})
    
    // product.get("product1")
    // .then((response) => console.log(response))
    // .catch((e) => {console.error("Could not fetch product!" + e)})
}

module.exports = createProductSchema();