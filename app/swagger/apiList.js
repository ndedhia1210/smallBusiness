const { authApis } = require("../auth/authSwaggerDoc");
const { userApis } = require("../user/userSwaggerDoc");

module.exports = {
    apis: {
        ...authApis,
        ...userApis,
    }
}