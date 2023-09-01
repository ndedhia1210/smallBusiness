const { sendError } = require('../util/error.js');

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

exports.getCategories_v1 = (req, res, next) => {
    getAllCategories()
    .then((categories) => { res.json({ 
        code: 200, 
        categories: categories.map((category) => {
            return {
                'id': category._id,
                'name': category.name
            }
        })
    }) })
    .catch((errorCode) => {
        switch(errorCode) {
            case 504: return sendError(res, errorCode, 'Unable to fetch categories from store!');
            default: return sendError(res, 500, 'Something went wrong!');
        }
    })
}

function getAllCategories() {
    return new Promise(function (resolve, reject) {
        return require('../database.js').getDb().collection('category').find().toArray()
        .then((categories) => {
            resolve(categories);
        })
        .catch((error) => {
            console.log(error);
            reject(504);
        });
    });
}