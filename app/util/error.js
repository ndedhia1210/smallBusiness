// following function will be reused to return error 
// with given error code and message
module.exports = {
    sendError(res, code, errorMessage) {
        res.status(code);
        res.json({
            code,
            errorMessage
        });
    }
};

// const errorCodeToMEssageMapping = {
//     401: 'Not avaolbale',
//     500: 'Server eerror',
//     504: ''
//     ...
// }