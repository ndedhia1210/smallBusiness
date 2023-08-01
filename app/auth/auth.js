const Joi = require('joi');
const { validator } = require('../util/validator');
const { sendError } = require('../util/error.js');
const { createToken } = require('./jwtTokensLib.js');

// Auth expects username and password and returns auth with JWT token.
exports.authorize = (req, res) => {
    const { username, password } = req.body;
    if(!username || !password) {
        console.log("Empty credentials!"); 
        return sendError(res, 400, "Empty credentials!");
    }

    const query = { username, password };

    require('../database.js').getDb().collection('user').findOne(query)
    .then( 
        (user) => { 
            if(!user) {
                console.log("Invalid credentials!"); 
                return sendError(res, 400, "Invalid credentials!");
            }
            else res.json(createToken(user));
        },
        (error) => { 
            console.log("Failed to fetch users! ", error);  
            res.send(error);
        }
    )
}

// Above API will be removed once UI moves to below one
// Auth expects username and password and returns auth with JWT token.
exports.authorize_v1 = (req, res) => {
    validateAuthRequest(req)
    .then((payload) => getUser(payload))
    .then((user) => { res.json({ code: 200, accessToken: createToken(user) }) })
    .catch((errorCode) => { 
        switch(errorCode) {
            case 422: return sendError(res, errorCode, 'Invalid request!');
            case 504: return sendError(res, errorCode, 'Downstream service error!');
            case 400: return sendError(res, errorCode, 'Invalid credentials!');
            case 403: return sendError(res, errorCode, 'User is not yet approved!');
            default: return sendError(res, 500, 'Something went wrong!');
        }
    })
}

function validateAuthRequest(request) {
    const payload = request.body;
    payload["deviceId"] = request.headers["deviceid"];

    return new Promise(function (resolve, reject) {
        const schema = Joi.object({
            username: Joi.string().trim().alphanum().min(5).max(30).required(), // character limit 5-30 and alpha numeric
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

function getUser(payload) {
    return new Promise(function (resolve, reject) {
        return require('../database.js').getDb().collection('user').findOne(payload)
        .then( 
            (user) => {
                if(!user) reject(400);
                else if(user.isApproved) resolve(user);
                else reject(403);
            }
        )
        .catch((error) => {
            console.log(error);
            reject(504);
        });
    });
}