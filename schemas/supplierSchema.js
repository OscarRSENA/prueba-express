const Joi = require('joi');


const id = Joi.string().uuid();
const company = Joi.string().min(3).max(50);
const phone = Joi.string(). max(20);
const nit = Joi.string(). max(50);


const createSupplierSchema = Joi.object({
    company: company.required(),
    phone: phone.required(),
    nit : nit.required()
});

const updateSupplierSchema = Joi.object({
    company: company,
    phone: phone,
    nit: nit
});

const getSupplierSchema = Joi.object({
    id: id.required(),
})
module.exports = { createSupplierSchema, updateSupplierSchema, getSupplierSchema }