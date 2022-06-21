const express = require('express')
const productsRouter = require('./productsRouter')
const usersRouter = require('./usersRouter')
const categoriesRouter = require('./categoriesRouter')
const cartsRouter = require('./cartsRouter')
const suppliersRouter = require('./suppliersRouter')
const billsRouter = require('./billsRouter')


function routerApi(app){
    const router = express.Router();
    app.use('/api/v1/', router)
    router.use('/products', productsRouter)
    router.use('/users', usersRouter)
    router.use('/categories', categoriesRouter)
    router.use('/carts', cartsRouter)
    router.use('/bills', billsRouter)
    router.use('/suppliers', suppliersRouter)
    
}

module.exports = routerApi;