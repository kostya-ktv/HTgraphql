import { CoffeesService } from './coffees.service';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Coffee } from './entities/coffe.entity.ts/coffe.entity';
import { ParseIntPipe } from '@nestjs/common';
import { CreateCoffeeInput } from './dto/create-coffee.input/create-coffee.input';

@Resolver()
export class CoffeesResolver {
    constructor(private readonly coffeeService: CoffeesService){}

    @Query(() => [Coffee], {name: 'coffees'})
    async findAll() {
        return this.coffeeService.findAll()
    }

    @Query(() => Coffee, { name: 'coffee'})
    async findOne(@Args('id', {type: () => ID}, ParseIntPipe) id: number) {
        return this.coffeeService.findOne(id)
    }

    @Mutation(() => Coffee, { name: 'createCoffee', nullable: true }) 
    async create(@Args('createCoffeeInput') createCoffeeInput: CreateCoffeeInput) {
        return this.coffeeService.create(createCoffeeInput)
    }

    @Mutation(() => Coffee, {name: 'updateCoffee'})
    async update(
        @Args('id', ParseIntPipe) id: number,
        @Args('updateCoffeeInput') updateCoffeeInput: UpdateCoffeeInput,
    ) { 
        return this.coffeeService.update(id, updateCoffeeInput)
    }
}
