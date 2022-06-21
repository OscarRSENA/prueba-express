const faker = require('faker')
const boom = require('@hapi/boom')

class InvoicesService {
    constructor(){
        this.invoices = [];
        this.generate();
    }

    generate(){
    const limit = 100;
    for (let i = 0; i < limit; i++) {
        this.invoices.push({
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
        const newInvoice = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.invoices.push(newInvoice)
        return newInvoice;
    }

    find(){
        return new Promise((resolve, reject)=>{
            setTimeout(() => {
                resolve(this.invoices);
            }, 5000);
        })
    }

    async findone(id){
        const invoice = this.invoices.find(item => item.id===id)
        if(!invoice){
           throw boom.notFound('Invoice not found');
        }
        if(invoice.isBlock){
            throw boom.conflict('Invoice is block')
        }
        return invoice;
    }

    async update(id, changes){
        const index = this.invoices.findIndex(item=>item.id===id )
        if(index === -1){
            throw boom.notFound('Invoice not found');
        }
        const invoice = this.invoices[index]
        this.invoices[index] = {
            ...invoice,
            ...changes
        }
        return this.invoices[index]
    }

    async delete(id){
        const index = this.invoices.findIndex(item=>item.id===id )
        if(index === -1){
            throw boom.notFound('Invoice not found');
        }
        this.invoices.splice(index, 1);
        return { id };
    }
}

module.exports = InvoicesService