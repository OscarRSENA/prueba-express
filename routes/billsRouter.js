const express = require('express')
const BillsService = require("./../services/billsService")
const validatorHandler = require("./../middlewares/validatorHandler")
const {createBillSchema, updateBillSchema, getBillSchema} = require("./../schemas/billSchema")
const router = express.Router();

const service = new BillsService()

router.get('/', async(req, res)=>{
    const bills = await service.find()
    res.json(bills)
})

router.get('/filter', (req, res)=>{
    res.send("Yo soy un filter")
})


router.get('/:id', 
 validatorHandler(getBillSchema, 'params'),
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
validatorHandler(getBillSchema, 'params'),
validatorHandler(updateBillSchema, 'body'),
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
validatorHandler(createBillSchema, 'body'),
async (req, res)=>{
    const body = req.body;
    const newBills = await service.create(body)
    res.status(201).json(newBills)
})

module.exports = router;