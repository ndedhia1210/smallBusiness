// This controller returns all users from DB.
exports.getUsers = (req, res) => {
    require('../database.js').getDb().collection('user').find().toArray()
    .then( 
        (users) => { res.json(users) },
        (error) => { 
            console.log("Failed to fetch users!");  
            res.send(error);
        }
    )
}
