const Joi = require('joi');
const { validator } = require('../util/validator');
const { sendError } = require('../util/error.js');
const { ObjectId } = require('mongodb');

exports.deleteProduct_v1 = (req, res, next) => {
    validateDeleteProductRequest(req)
    .then((payload) => deleteProduct(payload))
    .then(() => { res.json({ 
        code: 200, 
    }) }).catch((errorCode) => {
        switch(errorCode) {
            case 401: return sendError(res, errorCode, 'Product not found!');
            case 422: return sendError(res, errorCode, 'Invalid request!');
            case 504: return sendError(res, errorCode, 'Unable to delete product from store!');
            default: return sendError(res, 500, 'Something went wrong!');
        }
    })
}

function validateDeleteProductRequest(request) {
    const payload = request.query;
    return new Promise(function (resolve, reject) {
        const schema = Joi.object({
            productId: Joi.string().trim().required()
        });
        const { error, value } = validator(schema, payload);
        
        if(error) {
            console.log(error.details);
            reject(422);
        } 
        resolve(value);
    });
}

function deleteProduct(payload) {
    return new Promise(function (resolve, reject) {
        return require('../database.js').getDb().collection('product').deleteOne({"_id": new ObjectId(payload.productId)})
        .then((response) => {
            if(response.deletedCount === 0)
                reject(401);
            resolve();
        })
        .catch((error) => {
            console.log(error);
            reject(504);
        });
    });
}