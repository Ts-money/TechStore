// GraphQL Schema
const { gql } = require('apollo-server');

module.exports = gql`
    type Product {
        id: ID!
        name: String!
        price: String!
        imageURL: String!
        createdAt: String!
        username: String!
    }
    type User {
        id: ID!
        email: String!
        token: String!
        username: String!
        createdAt: String!
        cartItems: [String]!
    }
    input RegisterInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    type Query {
        getProducts: [Product]
        getProduct(productId: ID!): Product
        getUsers: [User]
        getUser(userId: ID!): User
    }
    type Mutation {
        register(registerInput: RegisterInput): User!
        login(username: String!, password: String!): User!
        createProduct(name: String!, price: String!, imageURL: String!): Product!
        deleteProduct(productId: ID!): String!
        addToCart(userId: ID!, productId: ID!): String!
        removeFromCart(userId: ID!, productId: ID!): String!
        clearCart(userId: ID!): String!
    }
`;