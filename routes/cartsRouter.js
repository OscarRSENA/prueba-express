const express = require('express')
const CartsService = require("./../services/cartsService")
const validatorHandler = require("./../middlewares/validatorHandler")
const {createCartSchema, updateCartSchema, getCartSchema} = require("./../schemas/cartSchema")
const router = express.Router();

const service = new CartsService()

router.get('/', async(req, res)=>{
    const carts = await service.find()
    res.json(carts)
})

router.get('/filter', (req, res)=>{
    res.send("Yo soy un filter")
})


router.get('/:id', 
 validatorHandler(getCartSchema, 'params'),
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
validatorHandler(getCartSchema, 'params'),
validatorHandler(updateCartSchema, 'body'),
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
validatorHandler(createCartSchema, 'body'),
async (req, res)=>{
    const body = req.body;
    const newCarts = await service.create(body)
    res.status(201).json(newCarts)
})

module.exports = router;