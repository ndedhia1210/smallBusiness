const { ObjectId } = require('mongodb');
const { validator } = require('../util/validator');
const { sendError } = require('../util/error.js');
const Joi = require('joi');

// Following api will be used for resetting user password.
exports.updateUserInfo_v1 = (req, res) => {
    validateUpdateUserRequest(req)
    .then((payload) => updateUserProfile(payload, req))
    .then(() => { res.json({ 
        code: 200, 
    }) })
    .catch((errorCode) => { 
        switch(errorCode) {
            case 422: return sendError(res, errorCode, 'Invalid request!');
            case 502: return sendError(res, errorCode, 'Failed to update user\'s profile!');
            default: return sendError(res, 500, 'Something went wrong!');
        }
    })
}

function validateUpdateUserRequest(request) {
    const payload = request.body;
    const user = request.user;

    return new Promise(function (resolve, reject) {
        const schema = Joi.object({
            username: Joi.string().trim().valid(user.username).required(),
            name: Joi.string().trim().required(),
            phoneNumber: Joi.string().trim().length(10).pattern(/^[0-9]+$/).required(),
            email: Joi.string().trim().email(),
            address: Joi.string().trim(),
        });
        const { error, value } = validator(schema, payload);
        
        if(error) {
            console.log(error.details);
            reject(422);
        } 
        resolve(value);
    });
}

function updateUserProfile(payload, req) {
    return new Promise(function(resolve, reject){
        const { _id } = req.user;
        const query = { '_id': new ObjectId(_id) };
        const currentDate = Date.parse((new Date()).toUTCString());
        const updateUserPayload = {
            name: payload.name, 
            phoneNumber: payload.phoneNumber,
            email: payload.email,
            address: payload.address,
            modifiedDate: currentDate,
            lastModifiedBy: new ObjectId(_id),
        }
            
        require('../database.js').getDb().collection('user').updateOne(query, { $set: updateUserPayload })
        .then( 
            (response) => {
                if(response?.modifiedCount < 1) reject(502);
                resolve("Successfully updated user's profile!");
            }
        )
        .catch((error) => { 
            console.log(error);
            reject(502);
        });
    });
}