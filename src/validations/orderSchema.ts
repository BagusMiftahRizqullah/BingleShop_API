const Joi = require("joi")

module.exports = Joi.object({
    id_user:Joi.number().required(),
    date_order: Joi.date().required(),
    customer_name:Joi.string().required(),
}) 