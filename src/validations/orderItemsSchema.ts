const Joi = require("joi")

module.exports = Joi.object({
    
    id_item: Joi.number().required(),
    id_user: Joi.number().required(),
    item_name:Joi.string().required(),
    item_quantity: Joi.number().required(), 
    item_price: Joi.number().required()
}) 