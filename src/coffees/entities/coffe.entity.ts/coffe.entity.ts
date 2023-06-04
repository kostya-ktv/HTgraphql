import { Field, ID, ObjectType } from "@nestjs/graphql"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
@ObjectType({description: 'Coffee entity model'})
export class Coffee {

    @PrimaryGeneratedColumn()
    @Field(() => ID, {})
    id: number

    @Column()
    name: string
    
    @Column()
    brand: string

    @Column({type: 'json'})
    flavors: string[]
}
