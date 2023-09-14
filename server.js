import express from "express"
import { graphqlHTTP } from "express-graphql"
import { buildSchema } from "graphql"

// Construct a schema, using GraphQL schema language
var schema = buildSchema(`
  type Query {
    getProducts: [Product]
  }

  type Product {
    id: ID
    title: String
    price: Float
    description: String
    category: String
    image: String
  }
`)

// The root provides a resolver function for each API endpoint
var root = {
  getProducts: async () => {
    const json = await (await fetch('https://fakestoreapi.com/products')).json();
    return json;
  },
}

var app = express()
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
)
app.listen(4000)
console.log("Running a GraphQL API server at http://localhost:4000/graphql")