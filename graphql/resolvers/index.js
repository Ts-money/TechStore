const usersResolvers = require('./users');
const productsResolvers = require('./products');

module.exports = {
    Query: {
        ...productsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...productsResolvers.Mutation
    }
};