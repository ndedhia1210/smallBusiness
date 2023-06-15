const { ObjectId } = require('mongodb');
const { sendError } = require('../util/error.js');

// Login controller reads username, password and 
// returns user information.
// Following API will be deprecated once UI migrate to Auth api
exports.login = (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) {
        return sendError(res, 400, "Empty credentials!");
    }

    const query = { username, password };

    require('../database.js').getDb().collection('user').findOne(query)
    .then( 
        (user) => { 
            if(!user) return sendError(res, 400, "Invalid credentials!");
            else res.json(user);
        },
        (error) => { 
            console.log("Failed to fetch users! ", error);  
            res.send(error);
        }
    )
}

// Following api will be used for getting user info
// This will just require jwt token and does not 
// need to pass any information
exports.getUserInfo = (req, res) => {
    const { user } = req.user;
    const query = { '_id': new ObjectId(user) };

    require('../database.js').getDb().collection('user').findOne(query)
    .then( 
        (user) => { 
            if(!user) return sendError(res, 400, "Invalid user!");
            else res.json(user);
        },
        (error) => { 
            console.log("Failed to fetch user! ", error);  
            res.send(error);
        }
    )
}