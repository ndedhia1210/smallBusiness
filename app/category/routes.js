const { loadCategoryData } = require("./loadCategoryData");
const { getCategories } = require("./getCategories");

// TODO: Add Swagger doc for better documentation 
// Swagger doc will contain request and response 
// structure for every api route
module.exports = function(app) {
    app.get("/categories", getCategories);
    app.post("/loadCategoryData", loadCategoryData);
}