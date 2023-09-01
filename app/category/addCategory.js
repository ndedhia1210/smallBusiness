const Joi = require('joi');
const { validator } = require('../util/validator');
const { sendError } = require('../util/error.js');

exports.addCategory_v1 = (req, res, next) => {
    validateAddCategoryRequest(req)
    .then((payload) => isCategoryExist(payload))
    .then((payload) => addCategory(payload))
    .then((category) => { res.json({ 
        code: 200, 
        'id': category.insertedId,
        'categoryName': req.body.categoryName
    }) }).catch((errorCode) => {
        switch(errorCode) {
            case 422: return sendError(res, errorCode, 'Invalid request!');
            case 409: return sendError(res, errorCode, 'Category exist!');
            case 504: return sendError(res, errorCode, 'Unable to fetch categories from store!');
            default: return sendError(res, 500, 'Something went wrong!');
        }
    })
}

function validateAddCategoryRequest(request) {
    const user = request.user;
    const payload = request.body;
    return new Promise(function (resolve, reject) {
        const schema = Joi.object({
            categoryName: Joi.string().trim().required()
        });
        const { error, value } = validator(schema, payload);
        
        if(error) {
            console.log(error.details);
            reject(422);
        } 
        resolve({ ...value, userId: user._id });
    });
}

function isCategoryExist(payload) {
    return new Promise(function (resolve, reject) {
        const query = [
            { name: payload.categoryName },
        ];

        return require('../database.js').getDb().collection('category').findOne({ "$or": query })
        .then( 
            (category) => {
                if(category) reject(409);
                resolve(payload);
            }
        )
        .catch((error) => {
            console.log(error);
            reject(504);
        });
    });
}

function addCategory(payload) {
    return new Promise(function (resolve, reject) {
        const currentDate = Date.parse((new Date()).toUTCString());
        const categoryDocument = {
            name: payload.categoryName,
            createdBy: payload.userId,
            lastModifiedBy: payload.userId,
            createdDate: currentDate,
            modifiedDate: currentDate,        
        }
        return require('../database.js').getDb().collection('category').insertOne(categoryDocument)
        .then((category) => {
            resolve(category);
        })
        .catch((error) => {
            console.log(error);
            reject(504);
        });
    });
}