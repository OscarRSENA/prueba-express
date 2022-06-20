const express = require('express')
const SuppliersService = require("./../services/suppliersService")
const validatorHandler = require("./../middlewares/validatorHandler")
const {createSupplierSchema, updateSupplierSchema, getSupplierSchema} = require("./../schemas/supplierSchema")
const router = express.Router();

const service = new SuppliersService()

router.get('/', async(req, res)=>{
    const suppliers = await service.find()
    res.json(suppliers)
})

router.get('/filter', (req, res)=>{
    res.send("Yo soy un filter")
})


router.get('/:id', 
 validatorHandler(getSupplierSchema, 'params'),
    async(req, res, next)=>{
        try {
            const { id }= req.params;
            const user = await service.findone(id);
            res.json(user) 
        } catch (error) {
            next(error)
        }
        
    })

router.patch('/:id', 
validatorHandler(getSupplierSchema, 'params'),
validatorHandler(updateSupplierSchema, 'body'),
async(req, res, next)=>{
    try {
    const { id }= req.params;
    const body = req.body;
    const user = await service.update(id, body)
    res.json(user)
    } catch (error) {
        next(error)
    }
    
})

router.delete('/:id', async(req, res)=>{
    const { id }= req.params;
    const rta= await service.delete(id)
    res.json(rta)
})

router.post('/', 
validatorHandler(createSupplierSchema, 'body'),
async (req, res)=>{
    const body = req.body;
    const newSuppliers = await service.create(body)
    res.status(201).json(newSuppliers)
})

module.exports = router;