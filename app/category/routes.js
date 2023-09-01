const { loadCategoryData } = require("./loadCategoryData");
const { getCategories, getCategories_v1 } = require("./getCategories");
const { addCategory_v1 } = require("./addCategory");
const { authenticateToken } = require("../auth/jwtTokensLib");
const { authenticateUser } = require("../auth/userAuthentication");
const { deleteCategory_v1 } = require("./deleteCategory");
const { updateCategory_v1 } = require("./updateCategory");

module.exports = function(app) {
    app.get("/v1/categories", authenticateToken, getCategories);
    app.post("/v1/loadCategoryData", authenticateToken, loadCategoryData);

    // Creating new endpoints with auth
    app.get("/v1/getCategories", authenticateToken, authenticateUser, getCategories_v1);
    app.post("/v1/addCategory", authenticateToken, authenticateUser, addCategory_v1);
    app.delete("/v1/deleteCategory", authenticateToken, authenticateUser, deleteCategory_v1);
    app.put("/v1/updateCategory", authenticateToken, authenticateUser, updateCategory_v1);
}