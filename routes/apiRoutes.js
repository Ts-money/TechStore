var User = require('../models/User');
var Product = require('../models/Product');

module.exports = function (app) {
    app.get('/api/product', async (req, res) => {
        try {
            const data = await Product.find().sort({createdAt: -1});
            res.json(data);
        } catch (err) {
            res.status(400).json({error: {name: error.name, msg: error.message}});
        }
    });

    app.get('/api/product/search', async (req, res) => {
        try {
            const {productId} = req.body;
            const data = await Product.findById(productId);
            if (data) {
                res.json(data);
            } else {
                res.status(400).json({error: {name: 'Product Not Found', msg: 'Product ID is invalid'}});
            }
        } catch (err) {
            res.status(400).json({error: {name: error.name, msg: error.message}});
        }
    });

    app.post('/add', async (req, res) => {
        try {
            let {name, price, imageURL, userId} = req.body;
            if (name && price && imageURL && userId) {
                const user = await User.findById(userId);
                if (user) {
                    let product = new Product({
                        name,
                        price,
                        imageURL,
                        user: user.id,
                        username: user.username,
                        createdAt: new Date().toISOString()
                    });
                    if (name.trim() === '') {
                        throw new Error('Product name cannot be empty...');
                    }
                    if (price < .01) {
                        throw new Error('Price must be a positive number...');
                    }
                    if (imageURL === undefined || imageURL === null || imageURL.trim() === '') {
                        imageURL = 'https://tradersofafrica.com/img/no-product-photo.jpg';
                    }
                    product = await product.save();
                    res.redirect("/");
                } else {
                    res.status(400).json({error: {name: 'User Not Found', msg: 'User ID is invalid'}});
                }
            } else {
                res.status(400).json({error: {name: 'Incorrect Fields', msg: 'All fields were not provided'}});
            }
        } catch (err) {
            res.status(400).json({error: {name: error.name, msg: error.message}});
        }
    });

}