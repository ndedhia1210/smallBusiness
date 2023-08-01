const { ObjectId } = require('mongodb');
const { validator } = require('../util/validator');
const { sendError } = require('../util/error.js');
const Joi = require('joi');

// Login controller reads username, password and 
// returns user information.
// Following API will be deprecated once UI migrate to Auth api
// TODO: Deprecate
exports.login = (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) {
        return sendError(res, 400, "Empty credentials!");
    }

    const query = { username, password };

    require('../database.js').getDb().collection('user').findOne(query)
    .then( 
        (user) => { 
            if(!user) return sendError(res, 400, "Invalid credentials!");
            else res.json(user);
        },
        (error) => { 
            console.log("Failed to fetch users! ", error);  
            res.send(error);
        }
    )
}

exports.getUserInfo = (req, res) => {
    const { user } = req.user;
    const query = { '_id': new ObjectId(user) };

    require('../database.js').getDb().collection('user').findOne(query)
    .then( 
        (user) => { 
            if(!user) return sendError(res, 400, "Invalid user!");
            // else if(user.isTemporaryPassword) return sendError(res, 404, "User needs to set the password!"); // TODO: Check in the meeting whether we need this behavior or not? 
            else res.json(user);
        },
        (error) => { 
            console.log("Failed to fetch user! ", error);  
            res.send(error);
        }
    )
}

// Following api will be used for getting user info
// This will just require jwt token and does not 
// need to pass any information
exports.getUserInfo_v1 = (req, res) => {
    validateGetUserInfoRequest(req)
    .then(() => { res.json({ 
        code: 200, 
        name: req.user.name,
        username: req.user.username,
        phoneNumber: req.user.phoneNumber,
        email: req.user.email,
        address: req.user.address,
        isApproved: req.user.isApproved
    }) })
    .catch((errorCode) => { 
        switch(errorCode) {
            case 422: return sendError(res, errorCode, 'Invalid request!');
            default: return sendError(res, 500, 'Something went wrong!');
        }
    })
}

function validateGetUserInfoRequest(request) {
    return new Promise(function (resolve, reject) {
        const payload = request.body;
        const schema = Joi.object({
            username: Joi.string().trim().valid(request.user.username).required(), // character limit 5-30 and alpha numeric
        });
        const { error, value } = validator(schema, payload);
        
        if(error) {
            console.log(error.details);
            reject(422);
        } 
        resolve(value);
    });
}