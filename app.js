const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const productsRouts = require('./api/routes/products'); 
const ordersRouts = require('./api/routes/orders'); 

mongoose.connect('mongodb+srv://indraa:'+ process.env.MONGO_ATLAS_PW +'@node-rest-shop-dtcc7.mongodb.net/test?retryWrites=true&w=majority', {
    // useMongoClient: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(morgan('dev'));
app.use('/products', productsRouts);
app.use('/orders', ordersRouts);

app.use((req,res, next) =>{
    const error =new Error('Not Found');
    error.status(404);
    next(error);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
});

module.exports = app;