const { deviceIdHeader, jwtTokenHeader, responseError } = require("../swagger/util");

module.exports = {
    categoryApis: {
        '/v1/getCategories': {
            method: 'get',
            name: 'Categories data',
            description: 'This service is used for loading all categories!',
            tags: ['Category'],
            parameters: {
                header: { ...jwtTokenHeader, ...deviceIdHeader }
            },
            responseType: 'array',
            response: {
                '200': {
                    id: {
                        type: 'string', 
                        example: '644accd450a5d85079dafdea'
                    },
                    name: {
                        type: 'string', 
                        example: 'Dry fruits'
                    },
                },
                ...responseError([400, 401, 403, 422, 504, 500])
            }
        },
        '/v1/addCategory': {
            method: 'post',
            name: 'Add Category',
            description: 'This service is used for adding new category!',
            tags: ['Category'],
            parameters: {
                header: { ...jwtTokenHeader, ...deviceIdHeader }
            },
            request: {
                categoryName: {
                    type: 'string', 
                    example: 'Something new',
                    required: true
                },
            },
            response: {
                '200': {
                    code: {
                        type: 'number', 
                        example: '200'
                    },
                    id: {
                        type: 'string', 
                        example: '64dfeeac0720b73d241008de'
                    },
                    categoryName: {
                        type: 'string', 
                        example: 'Something new'
                    }
                },
                ...responseError([400, 401, 403, 409, 422, 500, 504])
            }
        },
        '/v1/updateCategory': {
            method: 'put',
            name: 'Update category',
            description: 'This service is used for updating Category!',
            tags: ['Category'],
            parameters: {
                header: { ...jwtTokenHeader, ...deviceIdHeader }
            },
            request: {
                id: {
                    type: 'string', 
                    example: '64dfeeac0720b73d241008de',
                    required: true
                },
                categoryName: {
                    type: 'string', 
                    example: 'Update something new',
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
                ...responseError([400, 401, 403, 422, 500, 504])
            }
        },
        '/v1/deleteCategory': {
            method: 'delete',
            name: 'Delete Category',
            description: 'This service is used for deleting category!',
            tags: ['Category'],
            parameters: {
                header: { ...jwtTokenHeader, ...deviceIdHeader },
                query: {
                    id: {
                        type: 'string', 
                        example: '64dea91c7f1e5f485ec347b6',
                        required: true,
                        description: 'This is Category Id and should be pass as query string in api'
                    }
                }
            },
            response: {
                '200': {
                    code: {
                        type: 'number', 
                        example: '200'
                    },
                },
                ...responseError([400, 401, 403, 422, 504, 500])
            }
        },
    }
}