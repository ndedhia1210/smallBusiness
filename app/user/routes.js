const { loadUserData } = require("./loadUserData");
const { getUsers } = require("./getUsers");
const { login } = require("./login");

// TODO: Add Swagger doc for better documentation
// Swagger doc will contain request and response
// structure for every api route
module.exports = function (app) {
  app.get("/users", getUsers);
  app.post("/login", login);
  app.post("/loadUserData", loadUserData);
};
