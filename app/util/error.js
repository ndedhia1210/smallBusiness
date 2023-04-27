// following function will be reused to return error 
// with given error code and message
module.exports = {
    sendError(res, code, error) {
        res.status(code);
        res.json({
            error: error
        });
    }
};