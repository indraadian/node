const express = require('express');
const app = express();
const morgan = require('morgan');
<<<<<<< HEAD
const bodyParser = require('body-parser');
=======
const mongoose = require('mongoose');
>>>>>>> 69ad09c2effa18c0ee35009e56678d452dbf67d5

const productsRouts = require('./api/routes/products'); 
const ordersRouts = require('./api/routes/orders'); 

<<<<<<< HEAD
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) =>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONs') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
=======
mongoose.connect('mongodb+srv://indraa:'+ process.env.MONGO_ATLAS_PW +'@node-rest-shop-dtcc7.mongodb.net/test?retryWrites=true&w=majority', {
    // useMongoClient: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
>>>>>>> 69ad09c2effa18c0ee35009e56678d452dbf67d5
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