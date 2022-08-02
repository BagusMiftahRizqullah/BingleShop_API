const Joi = require("joi")

module.exports = Joi.object({
    
    item_name: Joi.string().required(), 
    item_category:Joi.string().required(), 
    item_quantity: Joi.number().required(), 
    item_price: Joi.number().required(),
    item_status: Joi.boolean().required()
}) 