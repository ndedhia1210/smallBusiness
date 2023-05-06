// This controller returns all categories from DB.
exports.getCategories = (req, res, next) => {
    require('../database.js').getDb().collection('category').find().toArray()
    .then( 
        (categories) => { res.json(categories) },
        (error) => { 
            console.log("Failed to fetch categories!");  
            res.send(error);
        }
    )
}
