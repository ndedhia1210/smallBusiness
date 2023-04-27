const { sendError } = require('../util/error.js');

// Login controller reads username, password and 
// returns user information.
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
