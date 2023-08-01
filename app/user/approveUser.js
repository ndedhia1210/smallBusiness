const { ObjectId } = require('mongodb');
const { validator } = require('../util/validator');
const { sendError } = require('../util/error.js');
const Joi = require('joi');

exports.approveUser_v1 = (req, res) => {
    validateApproveUserRequest(req)
    .then((payload) => updateUserApproval(payload, req))
    .then(() => { res.json({ 
        code: 200, 
    }) })
    .catch((errorCode) => {
        console.log(errorCode); 
        switch(errorCode) {
            case 422: return sendError(res, errorCode, 'Invalid request!');
            case 502: return sendError(res, errorCode, 'Failed to approve user\'s profile!');
            default: return sendError(res, 500, 'Something went wrong!');
        }
    })
}

function validateApproveUserRequest(request) {
    const payload = request.body;

    return new Promise(function (resolve, reject) {
        const schema = Joi.object({
            userId: Joi.string().trim().required(), 
        });
        const { error, value } = validator(schema, payload);
        
        if(error) {
            console.log(error.details);
            reject(422);
        } 
        resolve(value);
    });
}

function updateUserApproval(payload, req) {
    return new Promise(function (resolve, reject) {
        const userId = payload.userId;
        const query = { '_id': new ObjectId(userId) };
        const adminId = req.user._id;
        const currentDate = Date.parse((new Date()).toUTCString());
        const updateUserPayload = {
            isApproved: true, 
            modifiedDate: currentDate,
            lastModifiedBy: new ObjectId(adminId),
        }
        
        require('../database.js').getDb().collection('user').updateOne(query, { $set: updateUserPayload })
        .then( 
            (response) => {
                if(response?.modifiedCount < 1) reject(502);
                resolve("Successfully approved user's profile!");
            }
        )
        .catch((error) => { 
            console.log(error);
            reject(502);
        });
    });
}