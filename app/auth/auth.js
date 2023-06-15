const { sendError } = require('../util/error.js');
const { createToken } = require('./jwtTokensLib.js');

// Auth expects username and password and returns auth with JWT token.
exports.authorize = (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) {
        console.log("Empty credentials!"); 
        return sendError(res, 400, "Empty credentials!");
    }

    const query = { username, password };

    require('../database.js').getDb().collection('user').findOne(query)
    .then( 
        (user) => { 
            if(!user) {
                console.log("Invalid credentials!"); 
                return sendError(res, 400, "Invalid credentials!");
            }
            else res.json(createToken(user));
        },
        (error) => { 
            console.log("Failed to fetch users! ", error);  
            res.send(error);
        }
    )
}
