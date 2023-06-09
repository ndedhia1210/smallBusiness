const jwt = require('jsonwebtoken'); 
const { sendError } = require('../util/error');

// Following library is used for generating token
// based on user detail
exports.createToken = (user) => {
    const accessToken = jwt.sign( 
    { user: user._id }, 
    process.env.JWT_SECRET // We can set TTL for this if needed
  ); 
  return accessToken
}; 

// Following library is used for validating token received during
// service call. 
// This will be invoked for every service, so if token failed to validate
// then it will return error and skip further processing.
exports.authenticateToken = (req, res, next) => { 
  try {
    const authHeader = req.headers["authorization"]; 
    const splitToken = authHeader && authHeader.split(" "); 
    if (splitToken[0] !== process.env.JWT_TOKEN_PREFIX) 
      return sendError(res, 401, "Invalid token!"); 
    
    const token = splitToken[1];
    if (token === null) 
      return res.status(400).json({ msg: "Missing token!" }); 

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => { 
      if (err) return sendError(res, 401, "Invalid token!");  
      req.user = user; 
      next(); 
    }); 
  } catch(error) {
    return sendError(error, 500, "Authorization error!");  
  }
}; 
