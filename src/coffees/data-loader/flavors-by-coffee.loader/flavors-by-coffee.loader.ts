import { Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DataLoader from 'dataloader';
import { Coffee } from 'src/coffees/entities/coffee.entity/coffee.entity';
import { Flavor } from 'src/coffees/entities/flavor.entity/flavor.entity';
import { In, Repository } from 'typeorm';

@Injectable({scope: Scope.REQUEST})
export class FlavorsByCoffeeLoader extends DataLoader<number, Flavor[]> {
    constructor(
        @InjectRepository(Coffee)
        private readonly coffeesRepo: Repository<Coffee>) {
        super(keys => this.batchLoadFn(keys));
    }

    private async batchLoadFn(coffeeIds: readonly number[]): Promise<Flavor[][]> {
        const coffeeWithFlavors = await this.coffeesRepo.find({
            select: ['id'],
            relations: {
                flavors: true
            },
            where: {
                id: In(coffeeIds)
            }
        })
        return coffeeWithFlavors.map(coffee => coffee.flavors)
    }
}
