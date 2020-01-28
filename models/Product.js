// Product Schema for MongoDB
const {model, Schema} = require('mongoose');

const productSchema = new Schema({
    name: String,
    price: String,
    imageURL: String,
    username: String,
    createdAt: String,
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
});

module.exports = model('Product', productSchema);