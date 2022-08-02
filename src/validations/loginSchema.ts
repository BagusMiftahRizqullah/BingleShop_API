const Joi = require("joi")

module.exports = Joi.object({
    user_name: Joi.string().required(),
    password: Joi.string().min(8).required()
    
}) 