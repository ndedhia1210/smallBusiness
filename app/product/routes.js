const { loadProductData } = require("./loadProductData");
const { authenticateToken } = require("../auth/jwtTokensLib");
const { authenticateUser } = require("../auth/userAuthentication");
const { getProducts_v1 } = require("./getProducts");
const { getProductsByCategory_v1 } = require("./getProductsByCategory");
const { getProductByProductId_v1 } = require("./getProductsByProductId");
const { deleteProduct_v1 } = require("./deleteProduct");
const { addProduct_v1 } = require("./addProduct");
const { updateProduct_v1 } = require("./updateProduct");

module.exports = function(app) {
    app.post("/v1/loadProductData", authenticateToken, loadProductData);

    app.get("/v1/products", authenticateToken, authenticateUser, getProducts_v1);
    app.get("/v1/getProductsByCategory", authenticateToken, authenticateUser, getProductsByCategory_v1);
    app.get("/v1/getProductByProductId", authenticateToken, authenticateUser, getProductByProductId_v1);
    app.post("/v1/addProduct", authenticateToken, authenticateUser, addProduct_v1);
    app.put("/v1/updateProduct", authenticateToken, authenticateUser, updateProduct_v1);
    app.delete("/v1/deleteProduct", authenticateToken, authenticateUser, deleteProduct_v1);
}