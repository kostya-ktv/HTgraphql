import { registerEnumType } from "@nestjs/graphql";

/* 
    mutation {
        createCoffee(createCoffee: {
            name: "Shipwreck Roast",
            brand: "BuddyBrew",
            flavors: [
                "chocolate",
                "vanilla"
            ],
            type: ROBUSTA
        }) {
            id
            name
            brand
            flavors {
                id
                name
            }
        }
    }
*/

/* 
    Get CoffeeType enum
    {
        __type(name: "CoffeeType") {
            enumValues {
                name
            }
        }
    }
*/
export enum CoffeeType {
    ARABICA = 'Arabica',
    ROBUSTA = 'Robusta'
}

registerEnumType(CoffeeType, {
    name: 'CoffeeType'
})
