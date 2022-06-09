const express = require('express')
const UserService = require("./../services/usersService")
const validatorHandler = require("./../middlewares/validatorHandler")
const {createUserSchema, updateUserSchema, getUserSchema} = require("./../schemas/userSchema")
const router = express.Router();

const service = new UsersService()

router.get('/', async(req, res)=>{
    const users = await service.find()
    res.json(users)
})

router.get('/filter', (req, res)=>{
    res.send("Yo soy un filter")
})


router.get('/:id', 
 validatorHandler(getUserSchema, 'params'),
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
validatorHandler(getUserSchema, 'params'),
validatorHandler(updateUserSchema, 'body'),
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
validatorHandler(createUserSchema, 'body'),
async (req, res)=>{
    const body = req.body;
    const newUser = await service.create(body)
    res.status(201).json(newUser)
})

module.exports = router;