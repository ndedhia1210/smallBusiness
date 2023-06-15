const { authorize } = require("./auth");

// TODO: Add Swagger doc for better documentation
// Swagger doc will contain request and response
// structure for every api route
module.exports = function (app) {
  app.post("/auth", authorize);
};
