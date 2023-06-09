const { loadCategoryData } = require("./loadCategoryData");
const { getCategories } = require("./getCategories");
const { authenticateToken } = require("../auth/jwtTokensLib");

// TODO: Add Swagger doc for better documentation 
// Swagger doc will contain request and response 
// structure for every api route
module.exports = function(app) {
    app.get("/categories", authenticateToken, getCategories);
    app.post("/loadCategoryData", authenticateToken, loadCategoryData);
}