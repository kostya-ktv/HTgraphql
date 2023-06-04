import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Coffee } from "../coffee.entity/coffee.entity";

@Entity()
@ObjectType()
export class Flavor {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @ManyToMany(type => Coffee, coffee => coffee.flavors)
    coffees: Coffee[]
 }
