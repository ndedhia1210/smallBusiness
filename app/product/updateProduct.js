const { ObjectId } = require('mongodb');
const Joi = require('joi');
const { sendError } = require('../util/error.js');
const { validator } = require('../util/validator');
const { UNIT_OF_MEASURE } = require('./loadProductData.js');

exports.updateProduct_v1 = (req, res, next) => {
    validateUpdateProductRequest(req)
    .then((payload) => updateProduct(payload, req)) // TODO: Should we add category check? will it add any value?
    .then(() => { res.json({ 
        code: 200, 
    }) }).catch((errorCode) => {
        console.log(errorCode)
        switch(errorCode) {
            case 401: return sendError(res, errorCode, 'Product not found!');
            case 422: return sendError(res, errorCode, 'Invalid request!');
            case 504: return sendError(res, errorCode, 'Unable to update Product from store!');
            default: return sendError(res, 500, 'Something went wrong!');
        }
    })
}

function validateUpdateProductRequest(request) {
    const payload = request.body;
    return new Promise(function (resolve, reject) {
        const schema = Joi.object({
            id: Joi.string().trim().required(),
            name: Joi.string().trim().required(),
            description: Joi.string().trim().required(),
            sku: Joi.string().trim().required(),
            unitMeasure: Joi.string().trim().required().valid(...Object.values(UNIT_OF_MEASURE)),
            totalQuantity: Joi.number().required(),
            remainingQuantity: Joi.number().required(),
            minimumQuantity: Joi.number().required(),
            unitPrice: Joi.number().required(),
            currency: Joi.string().trim().required(),
            image: Joi.string().trim().required(),
            categoryId: Joi.string().trim().required()
        });
        const { error, value } = validator(schema, payload);
        
        if(error) {
            console.log(error.details);
            reject(422);
        } 
        resolve(value);
    });
}

function updateProduct(payload, request) {
    const { _id } = request.user;
    const query = { '_id': new ObjectId(payload.id) };
    const currentDate = Date.parse((new Date()).toUTCString());
    const updateProductPayload = {
        name: payload.name, 
        description: payload.description,
        sku: payload.sku,
        categoryId: new ObjectId(payload.categoryId),
        unitMeasure: payload.unitMeasure,
        totalQuantity: payload.totalQuantity,
        remainingQuantity: payload.remainingQuantity,
        minimumQuantity: payload.minimumQuantity,
        unitPrice: payload.unitPrice,
        currency: payload.currency,
        image: payload.image,
        modifiedDate: currentDate,
        lastModifiedBy: new ObjectId(_id),
    };
    return new Promise(function (resolve, reject) {
        require('../database.js').getDb().collection('product').updateOne(query, { $set: updateProductPayload })
        .then((response) => {
            if(response.matchedCount === 0)
                reject(401);
            resolve();
        })
        .catch((error) => {
            console.log(error);
            reject(504);
        });
    });
}