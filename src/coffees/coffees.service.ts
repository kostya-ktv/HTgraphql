import { UpdateCoffeeInput } from './dto/update-coffee.input/update-coffee.input';
import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input/create-coffee.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity/coffee.entity';
import { Repository } from 'typeorm';
import { UserInputError } from 'apollo-server-express';
import { Flavor } from './entities/flavor.entity/flavor.entity';

@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        private readonly flavorsRepository: Repository<Flavor>
    ) { }
    
    async findAll() {
        return this.coffeeRepository.find()
    }

    async findOne(id: number) {
        const coffee = this.coffeeRepository.findOne({
            where: {id}
        })
        if(!coffee) throw new UserInputError(`Coffee #${id} doesnt exists`)
        return coffee
    }

    async create(createCoffeeInput: CreateCoffeeInput) { 
        const flavors = await Promise.all(
            createCoffeeInput.flavors.map(name => this.preloadFlavorByName(name))
        )
        const coffee = this.coffeeRepository.create({...createCoffeeInput, flavors})
        return this.coffeeRepository.save(coffee)
    }

    async update(id: number, updateCoffeeInput: UpdateCoffeeInput) {
        const flavors = updateCoffeeInput.flavors && await Promise.all(
            updateCoffeeInput.flavors.map(name => this.preloadFlavorByName(name))
        )
        const coffee = await this.coffeeRepository.preload({
            id, ...updateCoffeeInput, flavors
        })
        if (!coffee) {
            throw new UserInputError(`Coffee #${id} doesnt exists`)
        }
        return this.coffeeRepository.save(coffee)
    }
    async remove(id: number) {
        const coffee = await this.findOne(id)
        if(coffee){
            return this.coffeeRepository.remove(coffee)
        }
    }

    private async preloadFlavorByName(name: string): Promise<Flavor> {
        const flavor = await this.flavorsRepository.findOne({ where: { name } })
        return flavor || this.flavorsRepository.create(flavor)
    }
}
