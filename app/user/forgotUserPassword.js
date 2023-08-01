const { ObjectId } = require('mongodb');
const { validator } = require('../util/validator');
const { sendError } = require('../util/error.js');
const Joi = require('joi');

// Following api will be used for forgotting user password.
exports.forgotUserPassword_v1 = (req, res) => {
    validateForgotPasswordRequest(req)
    .then((payload) => updateUserPassword(payload, req))
    .then(() => { res.json({ 
        code: 200, 
    }) })
    .catch((errorCode) => { 
        switch(errorCode) {
            case 422: return sendError(res, errorCode, 'Invalid request!');
            case 502: return sendError(res, errorCode, 'Failed to forgot user\'s password!');
            default: return sendError(res, 500, 'Something went wrong!');
        }
    })
}

function validateForgotPasswordRequest(request) {
    const payload = request.body;
    const user = request.user;

    return new Promise(function (resolve, reject) {
        const schema = Joi.object({
            username: Joi.string().trim().valid(user.username).required(),
            newPassword: Joi.string().trim().alphanum().min(5).max(10).required(), // character limit 5-10 and alpha numeric
        });
        const { error, value } = validator(schema, payload);
        
        if(error) {
            console.log(error.details);
            reject(422);
        } 
        resolve(value);
    });
}

function updateUserPassword(payload, req) {
    return new Promise(function(resolve, reject){
        const { _id } = req.user;
        const query = { '_id': new ObjectId(_id) };
        const currentDate = Date.parse((new Date()).toUTCString());
        const updateUserPayload = {
            password: payload.newPassword, 
            modifiedDate: currentDate,
            lastModifiedBy: new ObjectId(_id),
        }
            
        require('../database.js').getDb().collection('user').updateOne(query, { $set: updateUserPayload })
        .then( 
            (response) => {
                if(response?.modifiedCount < 1) reject(502);
                resolve("Successfully forgot user's password!");
            }
        )
        .catch((error) => { 
            console.log(error);
            reject(502);
        });
    });
}