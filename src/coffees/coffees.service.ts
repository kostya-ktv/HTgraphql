import { Injectable } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input/create-coffee.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities/coffe.entity.ts/coffe.entity';
import { Repository } from 'typeorm';
import { UserInputError } from 'apollo-server-express';

@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>
    ) { }
    
    async findAll() {
        return this.coffeeRepository.find()
    }

    async findOne(id: number) {
        const coffee = this.coffeeRepository.findOne({
            where: {id}
        })
        return coffee || new UserInputError(`Coffee #${id} doesnt exists`)
    }

    async create(createCoffeeInput: CreateCoffeeInput) { 
        const coffee = this.coffeeRepository.create(createCoffeeInput)
        return this.coffeeRepository.save(coffee)
    }
}
