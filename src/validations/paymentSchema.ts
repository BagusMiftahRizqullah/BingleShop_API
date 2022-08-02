const Joi = require("joi")

module.exports = Joi.object({
   
    id_orders:Joi.number().required(),
    payment_date:Joi.date().required(),
    payment_type:Joi.string().required(),
    amount: Joi.number().required()
}) 