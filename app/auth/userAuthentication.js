const { ObjectId } = require("mongodb");
const { sendError } = require("../util/error");

// Following library is used for validating user received in token. 
// This will be invoked for every service, so if user info failed to match
// with our data then will fails the user authentication.
exports.authenticateUser = (req, res, next) => { 
    try {
      const query = { '_id': new ObjectId(req.user.user) };
      const deviceId = req.headers["deviceid"];

      require('../database.js').getDb().collection('user').findOne(query)
        .then( 
            (user) => {
                if(!user || user.deviceId !== deviceId) 
                    return sendError(res, 400, "Invalid user!");
                else if(!user.isApproved)
                    return sendError(res, 403, "User is not yet approved!");
                else {
                    req.user = user;
                    next();
                }
            },
            (error) => { 
                console.log("Failed to authenticate user against device!", error);  
                return sendError(res, 422, 'User not logged in through own device!');
            }
        )
    } catch(error) {
        console.log("Something wen wrong with Downstream!", error);  
        return sendError(res, 500, 'Something went wrong!'); 
    }
  }; 

exports.authenticateUserByUsername = (req, res, next) => { 
    try {
        const username = req.body.username;
        const deviceId = req.headers["deviceid"];
        const query = { 
            'username': username, 
            'deviceId': deviceId 
        };

        require('../database.js').getDb().collection('user').findOne(query)
        .then( 
            (user) => { 
                if(!user) 
                    return sendError(res, 401, "User not found!");
                if(!user.isApproved)
                    return sendError(res, 403, "User is not yet approved!");
                req.user = user;
                next();
            },
            (error) => { 
                console.log("Failed to authenticate user against device!", error);  
                return sendError(res, 422, 'User not logged in through own device!');
            }
        )
    } catch(error) {
        console.log("Something wen wrong with Downstream!", error);  
        return sendError(res, 500, 'Something went wrong!'); 
    }
}; 