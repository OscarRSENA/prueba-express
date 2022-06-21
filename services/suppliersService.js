const faker = require('faker')
const boom = require('@hapi/boom')

class SuppliersService {
    constructor(){
        this.suppliers = [];
        this.generate();
    }

    generate(){
    const limit = 100;
    for (let i = 0; i < limit; i++) {
        this.suppliers.push({
            id: faker.datatype.uuid(),
            company: faker.company.companyName(),
            phone: faker.phone.phoneNumberFormat(),
            nit: faker.finance.routingNumber(),
            isBlock: faker.datatype.boolean(),
        })
        
    }
    }

    async create(data){
        const newSupplier = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.suppliers.push(newSupplier)
        return newSupplier;
    }

    find(){
        return new Promise((resolve, reject)=>{
            setTimeout(() => {
                resolve(this.suppliers);
            }, 5000);
        })
    }

    async findone(id){
        const supplier = this.suppliers.find(item => item.id===id)
        if(!supplier){
           throw boom.notFound('supplier not found');
        }
        if(supplier.isBlock){
            throw boom.conflict('Providr is block')
        }
        return supplier;
    }

    async update(id, changes){
        const index = this.suppliers.findIndex(item=>item.id===id )
        if(index === -1){
            throw boom.notFound('supplier not found');
        }
        const supplier = this.suppliers[index]
        this.suppliers[index] = {
            ...supplier,
            ...changes
        }
        return this.suppliers[index]
    }

    async delete(id){
        const index = this.suppliers.findIndex(item=>item.id===id )
        if(index === -1){
            throw boom.notFound('supplier not found');
        }
        this.suppliers.splice(index, 1);
        return { id };
    }
}

module.exports = SuppliersService