const { ObjectId } = require('mongodb');
const Joi = require('joi');
const { sendError } = require('../util/error.js');
const { validator } = require('../util/validator');

exports.updateCategory_v1 = (req, res, next) => {
    validateUpdateCategoryRequest(req)
    .then((payload) => updateCategory(payload, req))
    .then(() => { res.json({ 
        code: 200, 
    }) }).catch((errorCode) => {
        switch(errorCode) {
            case 401: return sendError(res, errorCode, 'Category not found!');
            case 422: return sendError(res, errorCode, 'Invalid request!');
            case 504: return sendError(res, errorCode, 'Unable to update category from store!');
            default: return sendError(res, 500, 'Something went wrong!');
        }
    })
}

function validateUpdateCategoryRequest(request) {
    const payload = request.body;
    return new Promise(function (resolve, reject) {
        const schema = Joi.object({
            id: Joi.string().trim().required(),
            categoryName: Joi.string().trim().required()
        });
        const { error, value } = validator(schema, payload);
        
        if(error) {
            console.log(error.details);
            reject(422);
        } 
        resolve(value);
    });
}

function updateCategory(payload, request) {
    const { _id } = request.user;
    const query = { '_id': new ObjectId(payload.id) };
    const currentDate = Date.parse((new Date()).toUTCString());
    const updateCategoryPayload = {
        name: payload.categoryName, 
        modifiedDate: currentDate,
        lastModifiedBy: new ObjectId(_id),
    }

    return new Promise(function (resolve, reject) {
        require('../database.js').getDb().collection('category').updateOne(query, { $set: updateCategoryPayload })
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