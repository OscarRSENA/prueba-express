 const Joi = require('joi');


            const id = Joi.string().uuid();
            const company = Joi.string().min(3).max(50);
            const name = Joi.string().min(3). max(100);
            const date = Joi.date();
            const categories = Joi.string().min(3).max(50)
            const price = Joi.number().integer().min(10);
            const description = Joi.string(). max(500);
            
            
            const createBillSchema = Joi.object({
                company: company.required(),
                name: name.required(),
                date : date.required(),
                categories: categories.required(),
                price : price.required(),
                decription: description.required(),
            });
            
            const updateBillSchema = Joi.object({
                company: company,
                name: name,
                date: date,
                categories : categories,
                price : price,
                description: description,
            });
            
            const getBillSchema = Joi.object({
                id: id.required(),
            })
            module.exports = { createBillSchema, updateBillSchema, getBillSchema }