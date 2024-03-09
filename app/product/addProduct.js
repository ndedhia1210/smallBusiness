const Joi = require('joi');
const { validator } = require('../util/validator');
const { sendError } = require('../util/error.js');
const { UNIT_OF_MEASURE } = require('./loadProductData.js');
const { ObjectId } = require('mongodb');

exports.addProduct_v1 = (req, res, next) => {
    validateAddProductRequest(req)
    .then((payload) => isProductExist(payload))
    .then((payload) => isCategoryExist(payload))
    .then((payload) => addProduct(payload))
    .then((product) => { res.json({ 
        code: 200, 
        product: {
            'id': product.insertedId,
            'name': req.body.name,
            'description': req.body.description,
            'sku': req.body.sku,
            'unitMeasure': req.body.unitMeasure,
            'totalQuantity': req.body.totalQuantity,
            'remainingQuantity': req.body.remainingQuantity,
            'minimumQuantity': req.body.minimumQuantity,
            'unitPrice': req.body.unitPrice,
            'currency': req.body.currency,
            'image': req.body.image,
            'categoryId': req.body.categoryId,
        }
    }) }).catch((errorCode) => {
        switch(errorCode) {
            case 422: return sendError(res, errorCode, 'Invalid request!');
            case 408: return sendError(res, errorCode, 'Category does not exist!');
            case 409: return sendError(res, errorCode, 'Product exist!');
            case 504: return sendError(res, errorCode, 'Unable to check product uniqueness!');
            default: return sendError(res, 500, 'Something went wrong!');
        }
    })
}

function validateAddProductRequest(request) {
    const user = request.user;
    const payload = request.body;
    return new Promise(function (resolve, reject) {
        const schema = Joi.object({
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
        resolve({ ...value, userId: user._id });
    });
}

function isProductExist(payload) {
    return new Promise(function (resolve, reject) {
        const query = [
            { name: payload.name },
            { sku: payload.sku },
        ];

        return require('../database.js').getDb().collection('product').findOne({ "$or": query })
        .then( 
            (Product) => {
                if(Product) reject(409);
                resolve(payload);
            }
        )
        .catch((error) => {
            console.log(error);
            reject(504);
        });
    });
}

function isCategoryExist(payload) {
    return new Promise(function (resolve, reject) {
        const query = [
            { _id: new ObjectId(payload.categoryId) },
        ];

        return require('../database.js').getDb().collection('category').findOne({ "$or": query })
        .then( 
            (category) => {
                if(category) resolve(payload);
                reject(408);
                
            }
        )
        .catch((error) => {
            console.log(error);
            reject(504);
        });
    });
}

function addProduct(payload) {
    return new Promise(function (resolve, reject) {
        const currentDate = Date.parse((new Date()).toUTCString());
        const productDocument = {
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
            createdBy: payload.userId,
            lastModifiedBy: payload.userId,
            createdDate: currentDate,
            modifiedDate: currentDate,        
        };
        return require('../database.js').getDb().collection('product').insertOne(productDocument)
        .then((product) => {
            resolve(product);
        })
        .catch((error) => {
            console.log(error);
            reject(504);
        });
    });
}