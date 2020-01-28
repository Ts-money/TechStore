const usersResolvers = require('./users');
const productsResolvers = require('./products');
const cartResolvers = require('./cart');

module.exports = {
    Query: {
        ...usersResolvers.Query,
        ...productsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...productsResolvers.Mutation,
        ...cartResolvers.Mutation
    }
};