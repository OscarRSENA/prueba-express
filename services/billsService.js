const faker = require('faker')
const boom = require('@hapi/boom')

class BillsService {
    constructor(){
        this.bills = [];
        this.generate();
    }

    generate(){
    const limit = 100;
    for (let i = 0; i < limit; i++) {
        this.bills.push({
            id: faker.datatype.uuid(),
            company: faker.company.companyName(),
            date: faker.date.recent(),
            name: faker.commerce.productName(),
            categories:faker.commerce.product(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            isBlock: faker.datatype.boolean(),
        })
        
    }
    }

    async create(data){
        const newBill = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.bills.push(newBill)
        return newBill;
    }

    find(){
        return new Promise((resolve, reject)=>{
            setTimeout(() => {
                resolve(this.bills);
            }, 5000);
        })
    }

    async findone(id){
        const bill = this.bills.find(item => item.id===id)
        if(!bill){
           throw boom.notFound('bill not found');
        }
        if(bill.isBlock){
            throw boom.conflict('bill is block')
        }
        return bill;
    }

    async update(id, changes){
        const index = this.bills.findIndex(item=>item.id===id )
        if(index === -1){
            throw boom.notFound('bill not found');
        }
        const bill = this.bills[index]
        this.bills[index] = {
            ...bill,
            ...changes
        }
        return this.bills[index]
    }

    async delete(id){
        const index = this.bills.findIndex(item=>item.id===id )
        if(index === -1){
            throw boom.notFound('bill not found');
        }
        this.bills.splice(index, 1);
        return { id };
    }
}

module.exports = BillsService