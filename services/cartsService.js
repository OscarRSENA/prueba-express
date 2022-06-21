const faker = require('faker')
const boom = require('@hapi/boom')

class CartsService {
    constructor(){
        this.carts = [];
        this.generate();
    }

    generate(){
    const limit = 100;
    for (let i = 0; i < limit; i++) {
        this.carts.push({
            id: faker.datatype.uuid(),
            company: faker.company.companyName(),
            date: faker.date.recent(),
            name: faker.commerce.productName(),
            price: faker.commerce.price(),
            isBlock: faker.datatype.boolean(),
        })
        
    }
    }

    async create(data){
        const newCart = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.carts.push(newCart)
        return newCart;
    }

    find(){
        return new Promise((resolve, reject)=>{
            setTimeout(() => {
                resolve(this.carts);
            }, 5000);
        })
    }

    async findone(id){
        const cart = this.carts.find(item => item.id===id)
        if(!cart){
           throw boom.notFound('Cart not found');
        }
        if(cart.isBlock){
            throw boom.conflict('Cart is block')
        }
        return cart;
    }

    async update(id, changes){
        const index = this.carts.findIndex(item=>item.id===id )
        if(index === -1){
            throw boom.notFound('Cart not found');
        }
        const cart = this.carts[index]
        this.carts[index] = {
            ...cart,
            ...changes
        }
        return this.carts[index]
    }

    async delete(id){
        const index = this.carts.findIndex(item=>item.id===id )
        if(index === -1){
            throw boom.notFound('Cart not found');
        }
        this.carts.splice(index, 1);
        return { id };
    }
}

module.exports = CartsService