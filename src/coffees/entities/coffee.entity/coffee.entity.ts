import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm"
import { Flavor } from "../flavor.entity/flavor.entity"
import { Drink } from "src/common/interfaces/drink.interface/drink.interface"

@Entity()
@ObjectType({description: 'Coffee entity model', implements: () => Drink})
export class Coffee implements Drink{

    @PrimaryGeneratedColumn()
    @Field(() => ID, {})
    id: number

    @Column()
    name: string
    
    @Column()
    brand: string

    @JoinTable()
    @ManyToMany(type => Flavor, flavor => flavor.coffees, {cascade: true})
    flavors: Flavor[]

    @CreateDateColumn()
    createdAt?: Date
}
