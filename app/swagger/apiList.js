const { authApis } = require("../auth/authSwaggerDoc");
const { categoryApis } = require("../category/categorySwaggerDoc");
const { userApis } = require("../user/userSwaggerDoc");
const { productApis } = require("../product/productSwaggerDoc");

module.exports = {
    apis: {
        ...authApis,
        ...userApis,
        ...categoryApis,
        ...productApis,
    }
}