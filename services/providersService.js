const faker = require('faker')
const boom = require('@hapi/boom')

class ProvidersService {
    constructor(){
        this.providers = [];
        this.generate();
    }

    generate(){
    const limit = 100;
    for (let i = 0; i < limit; i++) {
        this.providers.push({
            id: faker.datatype.uuid(),
            company: faker.company.companyName(),
            phone: faker.phone.phoneNumberFormat(),
            nit: faker.finance.routingNumber(),
            isBlock: faker.datatype.boolean(),
        })
        
    }
    }

    async create(data){
        const newProvider = {
            id: faker.datatype.uuid(),
            ...data
        }
        this.providers.push(newProvider)
        return newProvider;
    }

    find(){
        return new Promise((resolve, reject)=>{
            setTimeout(() => {
                resolve(this.providers);
            }, 5000);
        })
    }

    async findone(id){
        const provider = this.providers.find(item => item.id===id)
        if(!provider){
           throw boom.notFound('Provider not found');
        }
        if(provider.isBlock){
            throw boom.conflict('Providr is block')
        }
        return provider;
    }

    async update(id, changes){
        const index = this.providers.findIndex(item=>item.id===id )
        if(index === -1){
            throw boom.notFound('Provider not found');
        }
        const provider = this.providers[index]
        this.providers[index] = {
            ...provider,
            ...changes
        }
        return this.providers[index]
    }

    async delete(id){
        const index = this.providers.findIndex(item=>item.id===id )
        if(index === -1){
            throw boom.notFound('Provider not found');
        }
        this.providers.splice(index, 1);
        return { id };
    }
}

module.exports = ProvidersService