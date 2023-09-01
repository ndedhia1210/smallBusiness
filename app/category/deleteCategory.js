const Joi = require('joi');
const { validator } = require('../util/validator');
const { sendError } = require('../util/error.js');
const { ObjectId } = require('mongodb');

exports.deleteCategory_v1 = (req, res, next) => {
    validateDeleteCategoryRequest(req)
    .then((payload) => deleteCategory(payload))
    .then(() => { res.json({ 
        code: 200, 
    }) }).catch((errorCode) => {
        switch(errorCode) {
            case 401: return sendError(res, errorCode, 'Category not found!');
            case 422: return sendError(res, errorCode, 'Invalid request!');
            case 504: return sendError(res, errorCode, 'Unable to delete category from store!');
            default: return sendError(res, 500, 'Something went wrong!');
        }
    })
}

function validateDeleteCategoryRequest(request) {
    const payload = request.query;
    return new Promise(function (resolve, reject) {
        const schema = Joi.object({
            id: Joi.string().trim().required()
        });
        const { error, value } = validator(schema, payload);
        
        if(error) {
            console.log(error.details);
            reject(422);
        } 
        resolve(value);
    });
}

function deleteCategory(payload) {
    return new Promise(function (resolve, reject) {
        return require('../database.js').getDb().collection('category').deleteOne({"_id": new ObjectId(payload.id)})
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