module.exports = {
    validator (schema, payload) {
        return schema.validate(payload, { abortEarly: false })
    } 
};