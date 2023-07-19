const { loadUserData } = require("./loadUserData");
const { getUsers } = require("./getUsers");
const { login, getUserInfo, getUserInfo_v1 } = require("./getUserInfo");
const { authenticateToken } = require("../auth/jwtTokensLib");
const { resetUserPassword_v1 } = require("./resetUserPassword");
const { registerUser_v1 } = require("./registerUser");
const { authenticateUser, authenticateUserByUsername } = require("../auth/userAuthentication");
const { forgotUserPassword_v1 } = require("./forgotUserPassword");
const { updateUserInfo_v1 } = require("./updateUserProfile");
const { approveUser_v1 } = require("./approveUser");

// TODO: Add Swagger doc for better documentation
// Swagger doc will contain request and response
// structure for every api route
module.exports = function (app) {
  app.get("/users", authenticateToken, getUsers);
  app.post("/login", authenticateToken, login);
  app.get("/getUser", authenticateToken, getUserInfo);
  app.post("/loadUserData", authenticateToken, loadUserData);


  // Keeping above once to avoid breaking changes on UI
  // From now on we will move to New routes for versioning 
  app.post("/v1/loadUserData", authenticateToken, loadUserData);
  app.get("/v1/users", authenticateToken, getUsers);
  app.post("/v1/register", registerUser_v1);
  app.get("/v1/getUser", authenticateToken, authenticateUser, getUserInfo_v1);
  app.post("/v1/resetUserPassword", authenticateToken, authenticateUser, resetUserPassword_v1);
  app.post("/v1/forgotUserPassword", authenticateUserByUsername, forgotUserPassword_v1);
  app.post("/v1/updateUser", authenticateToken, authenticateUser, updateUserInfo_v1);
  app.post("/v1/approveUser", authenticateToken, authenticateUser, approveUser_v1);
};
