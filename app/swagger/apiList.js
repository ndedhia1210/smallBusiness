const { authApis } = require("../auth/authSwaggerDoc");
const { categoryApis } = require("../category/categorySwaggerDoc");
const { userApis } = require("../user/userSwaggerDoc");

module.exports = {
    apis: {
        ...authApis,
        ...userApis,
        ...categoryApis,
    }
}