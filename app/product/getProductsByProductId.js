const { ObjectId } = require('mongodb');
const Joi = require('joi');
const { sendError } = require('../util/error.js');
const { validator } = require('../util/validator');

exports.getProductByProductId_v1 = (req, res, next) => {
    validateGetProductByProductIdRequest(req)
    .then((payload) => fetchProductByProductId(payload))
    .then((product) => { res.json({ 
        code: 200, 
        product: {
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
    }) }).catch((errorCode) => {
            switch(errorCode) {
            case 401: return sendError(res, errorCode, 'No product found for given product Id!');
            case 422: return sendError(res, errorCode, 'Invalid request!');
            case 504: return sendError(res, errorCode, 'Unable to get product from store!');
            default: return sendError(res, 500, 'Something went wrong!');
        }
    })
}

function validateGetProductByProductIdRequest(request) {
    const payload = request.query;
    return new Promise(function (resolve, reject) {
        const schema = Joi.object({
            productId: Joi.string().trim().required(),
        });
        const { error, value } = validator(schema, payload);
        
        if(error) {
            console.log(error.details);
            reject(422);
        } 
        resolve(value);
    });
}

function fetchProductByProductId(payload) {
    const query = { '_id': new ObjectId(payload.productId) };
    return new Promise(function (resolve, reject) {
        return require('../database.js').getDb().collection('product').findOne(query)
        .then((product) => {
            if(product) resolve(product);
            else reject(401);
        })
        .catch((error) => {
            console.log(error);
            reject(504);
        });
    });
}