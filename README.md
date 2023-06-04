### Get by id

```sh
    {
      coffee(id: 2) {
          id
          name
      }
    }
```

### Create samples:

```sh
  mutation {
    createCoffee(createCoffeeInput: {
        name: "Espresso",
        brand: "Aroma",
        flavors: ["ice"]
    }) {
        id,
        name,
        brand,
        flavors
    }
}
```
