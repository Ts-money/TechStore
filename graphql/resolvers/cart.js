const {AuthenticationError, UserInputError} = require('apollo-server');

const checkAuth = require('../../util/authentication-verifier');
const User = require('../../models/User');

module.exports = {
    Mutation: {
        async addToCart(_, {userId, productId}, context) {
            const user = await User.findById(userId);
            const userContext = checkAuth(context);
            if (user && userContext) {
                if (user.cartItems === undefined || user.cartItems === null) {
                    user.cartItems = [];
                }
                user.cartItems.push(productId);
                await user.save();
                return `${productId} added to user cart.`;
            } else {
                throw new UserInputError('User not found...');
            }
        },
        async removeFromCart(_, {userId, productId}, context) {
            const user = await User.findById(userId);
            const userContext = checkAuth(context);
            if (user && userContext) {
                if (user.cartItems === undefined || user.cartItems === null) {
                    user.cartItems = [];
                }
                user.cartItems = user.cartItems.filter((p) => p.id !== productId);
                await user.save();
                return `${productId} removed from user cart.`;
            } else {
                throw new UserInputError('User not found...');
            }
        },
        async clearCart(_, {userId}, context) {
            const user = await User.findById(userId);
            const userContext = checkAuth(context);
            if (user && userContext) {
                user.cartItems = [];
                await user.save();
                return 'User cart successfuly cleared';
            } else {
                throw new UserInputError("User not found...");
            }
        }
    }
}