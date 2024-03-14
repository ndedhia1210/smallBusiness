const { deviceIdHeader, jwtTokenHeader, responseError } = require("../swagger/util");

module.exports = {
    productApis: {
        '/v1/getProducts': {
            method: 'get',
            name: 'Products data',
            description: 'This service is used for loading all products!',
            tags: ['Product'],
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
                        example: 'Whole Cashews'
                    },
                    description: {
                        type: 'string', 
                        example: 'Whole Cashews 1LB'
                    },
                    sku: {
                        type: 'string', 
                        example: 'CASHEW-1LB-WH'
                    },
                    unitMeasure: {
                        type: 'string', 
                        example: 'kg',
                    },
                    totalQuantity: {
                        type: 'number', 
                        example: 500
                    },
                    remainingQuantity: {
                        type: 'number', 
                        example: 350
                    },
                    minimumQuantity: {
                        type: 'number', 
                        example: 1
                    },
                    unitPrice: {
                        type: 'number', 
                        example: 500
                    },
                    currency: {
                        type: 'string', 
                        example: 'RS'
                    },
                    imageReference: {
                        type: 'string', 
                        example: './cashew.png'
                    },
                    categoryId: {
                        type: 'string', 
                        example: '644accd450a5d85079dafdea'
                    },
                },
                ...responseError([504, 500])
            }
        },
        '/v1/getProductsByCategory': {
            method: 'get',
            name: 'Get products by Category',
            description: 'This service is used to fetch products based on category!',
            tags: ['Product'],
            parameters: {
                header: { ...jwtTokenHeader, ...deviceIdHeader },
                query: {
                    categoryId: {
                        type: 'string', 
                        example: '64dea91c7f1e5f485ec347b6',
                        required: true,
                        description: 'This is Category Id and should be pass as query string in api'
                    }
                }
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
                        example: 'Whole Cashews'
                    },
                    description: {
                        type: 'string', 
                        example: 'Whole Cashews 1LB'
                    },
                    sku: {
                        type: 'string', 
                        example: 'CASHEW-1LB-WH'
                    },
                    unitMeasure: {
                        type: 'string', 
                        example: 'kg',
                    },
                    totalQuantity: {
                        type: 'number', 
                        example: 500
                    },
                    remainingQuantity: {
                        type: 'number', 
                        example: 350
                    },
                    minimumQuantity: {
                        type: 'number', 
                        example: 1
                    },
                    unitPrice: {
                        type: 'number', 
                        example: 500
                    },
                    currency: {
                        type: 'string', 
                        example: 'RS'
                    },
                    imageReference: {
                        type: 'string', 
                        example: './cashew.png'
                    },
                    categoryId: {
                        type: 'string', 
                        example: '644accd450a5d85079dafdea'
                    },
                },
                ...responseError([400, 401, 403, 422, 500, 504])
            }
        },
        '/v1/getProductByProductId': {
            method: 'get',
            name: 'Get product by Product Id',
            description: 'This service is used to fetch product by product id!',
            tags: ['Product'],
            parameters: {
                header: { ...jwtTokenHeader, ...deviceIdHeader },
                query: {
                    productId: {
                        type: 'string', 
                        example: '64dea91c7f1e5f485ec347b6',
                        required: true,
                        description: 'This is Product Id and should be pass as query string in api'
                    }
                }
            },
            responseType: 'object',
            response: {
                '200': {
                    id: {
                        type: 'string', 
                        example: '644accd450a5d85079dafdea'
                    },
                    name: {
                        type: 'string', 
                        example: 'Whole Cashews'
                    },
                    description: {
                        type: 'string', 
                        example: 'Whole Cashews 1LB'
                    },
                    sku: {
                        type: 'string', 
                        example: 'CASHEW-1LB-WH'
                    },
                    unitMeasure: {
                        type: 'string', 
                        example: 'kg',
                    },
                    totalQuantity: {
                        type: 'number', 
                        example: 500
                    },
                    remainingQuantity: {
                        type: 'number', 
                        example: 350
                    },
                    minimumQuantity: {
                        type: 'number', 
                        example: 1
                    },
                    unitPrice: {
                        type: 'number', 
                        example: 500
                    },
                    currency: {
                        type: 'string', 
                        example: 'RS'
                    },
                    imageReference: {
                        type: 'string', 
                        example: './cashew.png'
                    },
                    categoryId: {
                        type: 'string', 
                        example: '644accd450a5d85079dafdea'
                    },
                },
                ...responseError([400, 401, 403, 422, 500, 504])
            }
        },
        '/v1/addProduct': {
            method: 'post',
            name: 'Add Product',
            description: 'This service is used for adding new product!',
            tags: ['Product'],
            parameters: {
                header: { ...jwtTokenHeader, ...deviceIdHeader }
            },
            request: {
                name: {
                    type: 'string', 
                    example: 'Whole Cashews',
                    required: true
                },
                description: {
                    type: 'string', 
                    example: 'Whole Cashews 1LB',
                    required: true
                },
                sku: {
                    type: 'string', 
                    example: 'CASHEW-1LB-WH',
                    required: true
                },
                unitMeasure: {
                    type: 'string', 
                    example: 'kg',
                    required: true
                },
                totalQuantity: {
                    type: 'number', 
                    example: 500,
                    required: true
                },
                remainingQuantity: {
                    type: 'number', 
                    example: 350,
                    required: true
                },
                minimumQuantity: {
                    type: 'number', 
                    example: 1,
                    required: true
                },
                unitPrice: {
                    type: 'number', 
                    example: 500,
                    required: true
                },
                currency: {
                    type: 'string', 
                    example: 'RS',
                    required: true
                },
                image: {
                    type: 'string', 
                    example: './cashew.png',
                    required: true
                },
                categoryId: {
                    type: 'string', 
                    example: '644accd450a5d85079dafdea',
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
                        example: '644accd450a5d85079dafdea'
                    },
                    name: {
                        type: 'string', 
                        example: 'Whole Cashews'
                    },
                    description: {
                        type: 'string', 
                        example: 'Whole Cashews 1LB'
                    },
                    sku: {
                        type: 'string', 
                        example: 'CASHEW-1LB-WH'
                    },
                    unitMeasure: {
                        type: 'string', 
                        example: 'kg',
                    },
                    totalQuantity: {
                        type: 'number', 
                        example: 500
                    },
                    remainingQuantity: {
                        type: 'number', 
                        example: 350
                    },
                    minimumQuantity: {
                        type: 'number', 
                        example: 1
                    },
                    unitPrice: {
                        type: 'number', 
                        example: 500
                    },
                    currency: {
                        type: 'string', 
                        example: 'RS'
                    },
                    imageReference: {
                        type: 'string', 
                        example: './cashew.png'
                    },
                    categoryId: {
                        type: 'string', 
                        example: '644accd450a5d85079dafdea'
                    },
                },
                ...responseError([400, 401, 403, 422, 500, 504])
            }
        },
        '/v1/updateProduct': {
            method: 'put',
            name: 'Update product',
            description: 'This service is used for updating Product!',
            tags: ['Product'],
            parameters: {
                header: { ...jwtTokenHeader, ...deviceIdHeader }
            },
            request: {
                id: {
                    type: 'string', 
                    example: '64dfeeac0720b73d241008de',
                    required: true
                },
                name: {
                    type: 'string', 
                    example: 'Whole Cashews',
                    required: true
                },
                description: {
                    type: 'string', 
                    example: 'Whole Cashews 1LB',
                    required: true
                },
                sku: {
                    type: 'string', 
                    example: 'CASHEW-1LB-WH',
                    required: true
                },
                unitMeasure: {
                    type: 'string', 
                    example: 'kg',
                    required: true
                },
                totalQuantity: {
                    type: 'number', 
                    example: 500,
                    required: true
                },
                remainingQuantity: {
                    type: 'number', 
                    example: 350,
                    required: true
                },
                minimumQuantity: {
                    type: 'number', 
                    example: 1,
                    required: true
                },
                unitPrice: {
                    type: 'number', 
                    example: 500,
                    required: true
                },
                currency: {
                    type: 'string', 
                    example: 'RS',
                    required: true
                },
                image: {
                    type: 'string', 
                    example: './cashew.png',
                    required: true
                },
                categoryId: {
                    type: 'string', 
                    example: '644accd450a5d85079dafdea',
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
                ...responseError([400, 401, 403, 422, 500, 504])
            }
        },
        '/v1/deleteProduct': {
            method: 'delete',
            name: 'Delete Product',
            description: 'This service is used for deleting product!',
            tags: ['Product'],
            parameters: {
                header: { ...jwtTokenHeader, ...deviceIdHeader },
                query: {
                    id: {
                        type: 'string', 
                        example: '64dea91c7f1e5f485ec347b6',
                        required: true,
                        description: 'This is product Id and should be pass as query string in api'
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