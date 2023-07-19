const Joi = require('joi');
const { validator } = require('../util/validator');
const { sendError } = require('../util/error.js');

exports.registerUser_v1 = (req, res) => {
    validateRegisterUserRequest(req)
    .then((payload) => isUserExist(payload))
    .then((payload) => insertUserDocument({ ...payload, user: req.user }))
    .then((_) => { res.json({ code: 200 }) })
    .catch((errorCode) => { 
        switch(errorCode) {
            case 422: return sendError(res, errorCode, 'Invalid request!');
            case 409: return sendError(res, errorCode, 'User exist!');
            case 504: return sendError(res, errorCode, 'Downstream service error');
            case 502: return sendError(res, errorCode, 'Failed to add user!');
            default: return sendError(res, 500, 'Something went wrong!');
        }
    })
}

function validateRegisterUserRequest(request) {
    const payload = request.body;
    payload["deviceId"] = request.headers["deviceid"];
    return new Promise(function (resolve, reject) {
        const schema = Joi.object({
            name: Joi.string().trim().required(),
            username: Joi.string().trim().alphanum().min(5).max(30).required(), // character limit 5-30 and alpha numeric
            phoneNumber: Joi.string().trim().length(10).pattern(/^[0-9]+$/).required(),
            email: Joi.string().trim().email(),
            address: Joi.string().trim(),
            password: Joi.string().trim().alphanum().min(5).max(10).required(), // character limit 5-10 and alpha numeric
            deviceId: Joi.string().trim().required(),
        });
        const { error, value } = validator(schema, payload);
        
        if(error) {
            console.log(error.details);
            reject(422);
        } 
        resolve(value);
    });
}

function isUserExist(payload) {
    return new Promise(function (resolve, reject) {
        const query = [
            { username: payload.username },
            { phoneNumber: payload.phoneNumber },
            { email: payload.email },
            { deviceId: payload.deviceId },
        ];

        return require('../database.js').getDb().collection('user').findOne({ "$or": query })
        .then( 
            (user) => {
                if(user) reject(409);
                resolve(payload);
            }
        )
        .catch((error) => {
            console.log(error);
            reject(504);
        });
    });
}

function insertUserDocument(payload) {
    return new Promise(function(resolve, reject){
        const currentDate = Date.parse((new Date()).toUTCString());
        const userDocument = {
            name: payload.name,
            username: payload.username,
            phoneNumber: payload.phoneNumber,
            email: payload.email,
            address: payload.address,
            password: payload.password,
            deviceId: payload.deviceId,
            createdBy: payload.username,
            lastModifiedBy: payload.username,
            isApproved: false,
            createdDate: currentDate,
            modifiedDate: currentDate,        
        }

        return require('../database.js').getDb().collection('user').insertOne(userDocument)
        .then( 
            (_) => resolve("Successfully registered user.!")
        )
        .catch((error) => { 
            console.log(error);
            reject(502);
        });
    });
}