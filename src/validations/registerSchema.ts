const Joi = require("joi")

module.exports = Joi.object({
    name:Joi.string().required(),
    no_telephone:Joi.string().required(),
    alamat: Joi.string().required(),
    user_name: Joi.string().required(),
    password: Joi.string().min(8).required()
    
}) 