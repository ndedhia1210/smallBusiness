const { deviceIdHeader, jwtTokenHeader, responseError } = require("../swagger/util");

module.exports = {
    userApis: {
        '/v1/users': {
            method: 'get',
            name: 'Users data',
            description: 'This service is used for loading all user\'s!',
            tags: ['User'],
            header: { ...jwtTokenHeader },
            responseType: 'array',
            response: {
                '200': {
                    _id: {
                        type: 'string', 
                        example: '64b72286576ed9ee5bb3de25'
                    },
                    name: {
                        type: 'string', 
                        example: 'Munna Tripathi'
                    },
                    username: {
                        type: 'string', 
                        example: 'mtripathi'
                    },
                    phoneNumber: {
                        type: 'string', 
                        example: '9876543210'
                    },
                    email: {
                        type: 'string', 
                        example: 'mtripathi@mirzapur.com'
                    },
                    address: {
                        type: 'string', 
                        example: '4VFG+87X, Tammanpatti, Uttar Pradesh 231304, India'
                    },
                    password: {
                        type: 'string', 
                        example: 'mtripathi'
                    },
                    deviceId: {
                        type: 'string', 
                        example: 'deviceId3'
                    },
                    createdBy: {
                        type: 'string', 
                        example: '475ad8d00d1b6786a101cd8s'
                    },
                    lastModifiedBy: {
                        type: 'string', 
                        example: '64b6de36b20f7714442762e0'
                    },
                    isApproved: {
                        type: 'boolean', 
                        example: true
                    },
                    createdDate: {
                        type: 'number', 
                        example: 1682559945
                    },
                    modifiedDate: {
                        type: 'number', 
                        example: 1682559945
                    }
                },
                ...responseError([400, 401, 500])
            }
        },
        '/v1/register': {
            method: 'post',
            name: 'User registration',
            description: 'This service is used for user registering!',
            tags: ['User'],
            header: { ...deviceIdHeader },
            request: {
                name: {
                    type: 'string', 
                    example: 'Munna Tripathi',
                    required: true
                },
                username: {
                    type: 'string', 
                    example: 'mtripathi',
                    required: true
                },
                phoneNumber: {
                    type: 'string', 
                    example: '9876543210',
                    required: true
                },
                email: {
                    type: 'string', 
                    example: 'mtripathi@mirzapur.com'
                },
                address: {
                    type: 'string', 
                    example: '4VFG+87X, Tammanpatti, Uttar Pradesh 231304, India',
                    required: true
                },
                password: {
                    type: 'string', 
                    example: 'mtripathi',
                    required: true
                },
            },
            response: {
                '200': {
                    code: {
                        type: 'number', 
                        example: '200'
                    }
                },
                ...responseError([409, 422, 500, 502, 504])
            }
        },
        '/v1/getUser': {
            method: 'get',
            name: 'User information',
            description: 'This service is used for getting user details!',
            tags: ['User'],
            header: { ...jwtTokenHeader, ...deviceIdHeader },
            request: {
                username: {
                    type: 'string', 
                    example: 'mtripathi',
                    required: true
                }
            },
            response: {
                '200': {
                    code: {
                        type: 'number', 
                        example: '200'
                    },
                    name: {
                        type: 'string', 
                        example: 'Munna Tripathi',
                        required: true
                    },
                    username: {
                        type: 'string', 
                        example: 'mtripathi',
                        required: true
                    },
                    phoneNumber: {
                        type: 'string', 
                        example: '9876543210',
                        required: true
                    },
                    email: {
                        type: 'string', 
                        example: 'mtripathi@mirzapur.com'
                    },
                    address: {
                        type: 'string', 
                        example: '4VFG+87X, Tammanpatti, Uttar Pradesh 231304, India',
                        required: true
                    },
                    isApproved: {
                        type: 'boolean', 
                        example: true
                    },
                },
                ...responseError([400, 401, 403, 422, 500 ])
            }
        },
        '/v1/resetUserPassword': {
            method: 'post',
            name: 'User password reset',
            description: 'This service is used for resetting user\'s password!',
            tags: ['User'],
            header: { ...jwtTokenHeader, ...deviceIdHeader },
            request: {
                username: {
                    type: 'string', 
                    example: 'mtripathi',
                    required: true
                },
                newPassword: {
                    type: 'string', 
                    example: 'mtripathi2',
                    required: true
                }
            },
            response: {
                '200': {
                    code: {
                        type: 'number', 
                        example: '200'
                    },
                },
                ...responseError([400, 401, 403, 422, 500, 502 ])
            }
        },
        '/v1/forgotUserPassword': {
            method: 'post',
            name: 'Forgot user password',
            description: 'This service is used for resetting user\'s password after forgot password!',
            tags: ['User'],
            header: { ...deviceIdHeader },
            request: {
                username: {
                    type: 'string', 
                    example: 'mtripathi',
                    required: true
                },
                newPassword: {
                    type: 'string', 
                    example: 'mtripathi2',
                    required: true
                }
            },
            response: {
                '200': {
                    code: {
                        type: 'number', 
                        example: '200'
                    },
                },
                ...responseError([400, 401, 403, 422, 500, 502 ])
            }
        },
        '/v1/updateUser': {
            method: 'post',
            name: 'Update user information',
            description: 'This service is used for updating user\'s info except password!',
            tags: ['User'],
            header: { ...jwtTokenHeader, ...deviceIdHeader },
            request: {
                username: {
                    type: 'string', 
                    example: 'mtripathi_update',
                    required: true
                },
                name: {
                    type: 'string', 
                    example: 'Munna Tripathi Update',
                    required: true
                },
                phoneNumber: {
                    type: 'string', 
                    example: '9876543214',
                    required: true
                },
                email: {
                    type: 'string', 
                    example: 'mtripathi_update@mirzapur.com'
                },
                address: {
                    type: 'string', 
                    example: 'Update 4VFG+87X, Tammanpatti, Uttar Pradesh 231304, India',
                },
            },
            response: {
                '200': {
                    code: {
                        type: 'number', 
                        example: '200'
                    },
                },
                ...responseError([400, 401, 403, 422, 500, 502 ])
            }
        },
        '/v1/approveUser': {
            method: 'post',
            name: 'Approve user profile',
            description: 'This service is used for approving user\'s profile by admin!',
            tags: ['User'],
            header: { ...jwtTokenHeader, ...deviceIdHeader },
            request: {
                userId: {
                    type: 'string', 
                    example: '64b6de36b20f7714442762e0',
                    required: true
                },
            },
            response: {
                '200': {
                    code: {
                        type: 'number', 
                        example: '200'
                    },
                },
                ...responseError([400, 401, 403, 422, 500, 502 ])
            }
        }
    }
}