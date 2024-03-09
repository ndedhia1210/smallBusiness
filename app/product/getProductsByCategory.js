const { ObjectId } = require('mongodb');
const Joi = require('joi');
const { sendError } = require('../util/error.js');
const { validator } = require('../util/validator');

exports.getProductsByCategory_v1 = (req, res, next) => {
    validateGetProductsByCategoryRequest(req)
    .then((payload) => fetchProductsByCategory(payload))
    .then((products) => { res.json({ 
        code: 200, 
        products: products.map((product) => {
            return {
                'id': product._id,
                'name': product.name,
                'description': product.description,
                'sku': product.sku,
                'unitMeasure': product.unitMeasure,
                'minimumQuantity': product.minimumQuantity,
                'unitPrice': product.unitPrice,
                'currency': product.currency,
                'imageReference': product.imageReference,
            }
        })
    }) }).catch((errorCode) => {
        console.log(errorCode)
        switch(errorCode) {
            case 401: return sendError(res, errorCode, 'Empty product list for given category!');
            case 422: return sendError(res, errorCode, 'Invalid getProductsByCategory request!');
            case 504: return sendError(res, errorCode, 'Unable to load products per category from store!');
            default: return sendError(res, 500, 'Something went wrong!');
        }
    })
}

function validateGetProductsByCategoryRequest(request) {
    const payload = request.query;
    return new Promise(function (resolve, reject) {
        const schema = Joi.object({
            categoryId: Joi.string().trim().required(),
        });
        const { error, value } = validator(schema, payload);
        
        if(error) {
            console.log(error.details);
            reject(422);
        } 
        resolve(value);
    });
}

function fetchProductsByCategory(payload) {
    const query = { 'categoryId': new ObjectId(payload.categoryId) };
    return new Promise(function (resolve, reject) {
        return require('../database.js').getDb().collection('product').find(query).toArray()
        .then((products) => {
            if(products.length) resolve(products);
            else reject(401);
        })
        .catch((error) => {
            console.log(error);
            reject(504);
        });
    });
}