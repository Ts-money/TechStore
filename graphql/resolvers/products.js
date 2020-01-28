const {AuthenticationError} = require('apollo-server');

const Product = require('../../models/Product');
const checkAuth = require('../../util/authentication-verifier');

const User = require('../../models/User');

module.exports = {
    Query: {
        // Gets all available products
        async getProducts() {
            try {
                const products = await Product.find().sort({createdAt: -1});
                return products;
            } catch (err) {
                throw new Error(err);
            }
        },
        // Get a specific product using its productId
        async getProduct(_, {productId}) {
            try {
                const product = await Product.findById(productId);
                if (product) {
                    return product;
                } else {
                    throw new Error('Product not found...');
                }
            } catch (err) {
                throw new Error(err);
            }
        }
    },
    Mutation: {
        // Creates a product using name, price and image url.
        async createProduct(_, {name, price, imageURL}, context) {
            const user = checkAuth(context);
            if (name.trim() === '') {
                throw new Error('Product name cannot be empty...');
            }
            if (price < .01) {
                throw new Error('Price must be a positive number...');
            }
            if (imageURL === undefined || imageURL === null || imageURL.trim() === '') {
                imageURL = 'https://tradersofafrica.com/img/no-product-photo.jpg';
            }

            const newProduct = new Product({
                name,
                price,
                imageURL,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            });

            const product = await newProduct.save();

            context.pubsub.publish('NEW_PRODUCT', {
                newProduct: product
            });

            return product;
        },
        // Deletes a product using productId
        async deleteProduct(_, {productId}, context) {
            const user = checkAuth(context);

            try {
                const product = await Product.findById(productId);
                if (user.username === product.username) {
                    await product.delete();
                    const users = await User.find().sort({createdAt: -1});
                    users.array.forEach(user => {
                        if (user.cartItems !== undefined || user.cartItems !== null) {
                            user.cartItems = user.cartItems.filter((p) => p.id === product.id);
                            user = user.save();
                        } else {
                            user.cartItems = [];
                            user = user.save();
                        }
                    });
                    return 'Product successfully deleted!';
                } else {
                    new AuthenticationError('You did not create this product...');
                }
            } catch (err) {
                console.log(err);
                throw new Error(err);
            }
        }
    }
}