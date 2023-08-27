exports.deviceIdHeader = {
    deviceId: {
        type: 'string',
        description: 'This is Device Id of user!'
    }
}

exports.jwtTokenHeader = {
    authorization: {
        type: 'string',
        description: 'This is JWT token!'
    }
}

exports.responseError = (errorCodes) => {
    const errorResponses = {};
    errorCodes.forEach(errorCode => {
        errorResponses[errorCode] = {
            code: {
                type: 'number', 
                example: errorCode
            },
            errorMessage: {
                type: 'string', 
                example: getErrorMessage(errorCode)
            }
        }
    });

    return errorResponses;
}

function getErrorMessage(errorCode) {
    switch(errorCode) {
        case 400: return 'Missing token! OR Invalid user!'
        case 401: return 'Invalid token! OR User not found!'
        case 403: return 'User is not yet approved!'
        case 422: return 'User not logged in through own device! OR Invalid request!'
        case 409: return 'User exist!'
        case 504: return 'Downstream service error'
        case 502: return 'Failed to add user! OR Failed to reset/forgot user\'s password OR update/approve User\'s profile!'
        case 500: return 'Authorization error OR Something went wrong!'
        default: return 'This error code is not defined in swagger!'
    }
}