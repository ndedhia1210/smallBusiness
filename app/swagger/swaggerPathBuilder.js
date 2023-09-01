exports.generateApiPathList = () => {
    const apis = require('./apiList').apis;
    const swaggerFormattedServiceDoc = {};
    Object.keys(apis).forEach(api => {
        const apiDoc = {};
        if(apis[api]['parameters'] && apis[api]['parameters']['query']) {
            buildParameterList(apiDoc, apis[api]['parameters']['query'], 'query');
        }
        if(apis[api]['parameters'] && apis[api]['parameters']['header']) {
            buildParameterList(apiDoc, apis[api]['parameters']['header'], 'header');
        }
        apiDoc[apis[api]['method']] = {
            operationId: apis[api]['name'],
            description: apis[api]['description'],
            tags: apis[api]['tags'],
        }
        apiDoc[apis[api]['method']]['requestBody'] = {};
        if(apis[api]['request'])
            buildRequestBody(apiDoc[apis[api]['method']]['requestBody'], apis[api]['request']);
        apiDoc[apis[api]['method']]['responses'] = {};
        buildResponse(apiDoc[apis[api]['method']]['responses'], apis[api]['response'], apis[api]['responseType']);
        swaggerFormattedServiceDoc[api] = apiDoc;
    });

    // console.log(JSON.stringify(swaggerFormattedServiceDoc, null, 6));
    return swaggerFormattedServiceDoc;
}

function buildParameterList(swaggerFormattedServiceDoc, parameterObj, parameterType) {
    let parameters = [];
    if(swaggerFormattedServiceDoc['parameters'])
        parameters = swaggerFormattedServiceDoc['parameters'];

    Object.keys(parameterObj).forEach(parameter => {
        parameters.push({
            name: parameter,
            in: parameterType,
            description: parameterObj[parameter].description,
            type: parameterObj[parameter].type
        });
    });
    
    swaggerFormattedServiceDoc['parameters'] = (parameters);
}

function buildRequestBody(swaggerRequestBodyMap, serviceRequestObj) {
    buildAttributeContent(swaggerRequestBodyMap, serviceRequestObj);
}

function buildAttributeContent(swaggerDocForContent, attributesMap, responseType='object') {
    const properties = {};
    Object.keys(attributesMap).forEach(attribute => {
        if(attribute !== 'description')
        {
            properties[attribute] = {
                type: attributesMap[attribute]['type'],
                example: attributesMap[attribute]['example'],
                required: attributesMap[attribute]['required'],
                description: attributesMap[attribute]['description'],
            }
        }
    });

    if(responseType === 'object') {
        swaggerDocForContent['content'] = {
            'application/json': {
                schema: {
                    type: 'object',
                    properties,
                }
            }
        }
    } else if(responseType === 'array') {
        swaggerDocForContent['content'] = {
            'application/json': {
                schema: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties,
                    },
                }
            }
        }
    }
}

function buildResponse(swaggerResponsesMap, serviceResponseObj, responseType) {
    Object.keys(serviceResponseObj).forEach(responseCode => {
        swaggerResponsesMap[responseCode] = {
            description: serviceResponseObj[responseCode]['description']
        }
        if(responseType && responseCode === '200') 
            buildAttributeContent(swaggerResponsesMap[responseCode], serviceResponseObj[responseCode], responseType);
        else 
            buildAttributeContent(swaggerResponsesMap[responseCode], serviceResponseObj[responseCode]);
    });
}
