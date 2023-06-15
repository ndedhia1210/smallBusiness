const { loadUserData } = require("./loadUserData");
const { getUsers } = require("./getUsers");
const { login, getUserInfo } = require("./login");
const { authenticateToken } = require("../auth/jwtTokensLib");

// TODO: Add Swagger doc for better documentation
// Swagger doc will contain request and response
// structure for every api route
module.exports = function (app) {
  app.get("/users", authenticateToken, getUsers);
  app.post("/login", authenticateToken, login);
  app.get("/getUser", authenticateToken, getUserInfo);
  app.post("/loadUserData", authenticateToken, loadUserData);
};
