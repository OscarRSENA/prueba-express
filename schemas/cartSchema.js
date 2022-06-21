const Joi = require('joi');


const id = Joi.string().uuid();
const name = Joi.string().min(3).max(50);
const amount = Joi.number().integer().max(100)
const price = Joi.number().integer().min(10);


const createCartSchema = Joi.object({
    name: name.required(),
    amount: amount.required(),
    price : price.required()
});

const updateCartSchema = Joi.object({
    name: name,
    amount: amount,
    price: price
});

const getCartSchema = Joi.object({
    id: id.required(),
})
module.exports = { createCartSchema, updateCartSchema, getCartSchema }