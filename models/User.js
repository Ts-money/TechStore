// User Schema for MongoDB
const {model, Schema} = require('mongoose');

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: String,
    cartItems: [String]
});

module.exports = model('User', userSchema);
