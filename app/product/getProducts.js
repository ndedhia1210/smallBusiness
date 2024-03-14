const { sendError } = require('../util/error.js');

// This controller returns all products from DB.
exports.getProducts_v1 = (req, res, next) => {
    getAllProducts()
    .then((products) => { res.json({ 
        code: 200, 
        products: products.map((product) => {
            return {
                'id': product._id,
                'name': product.name,
                'description': product.description,
                'sku': product.sku,
                'unitMeasure': product.unitMeasure,
                'totalQuantity': product.totalQuantity,
                'remainingQuantity': product.remainingQuantity,
                'minimumQuantity': product.minimumQuantity,
                'unitPrice': product.unitPrice,
                'currency': product.currency,
                'imageReference': product.imageReference,
                'categoryId': product.categoryId,
            }
        })
    }) })
    .catch((errorCode) => {
        switch(errorCode) {
            case 504: return sendError(res, errorCode, 'Unable to fetch products from store!');
            default: return sendError(res, 500, 'Something went wrong!');
        }
    })
}

function getAllProducts() {
    return new Promise(function (resolve, reject) {
        return require('../database.js').getDb().collection('product').find().toArray()
        .then((products) => {
            resolve(products);
        })
        .catch((error) => {
            console.log(error);
            reject(504);
        });
    });
}