const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const productsRouts = require('./api/routes/products');
const ordersRouts = require('./api/routes/orders');
const userRouter = require('./api/routes/user');

mongoose.connect('mongodb+srv://indraa:'+ process.env.MONGO_ATLAS_PW +'@node-rest-shop-dtcc7.mongodb.net/test?retryWrites=true&w=majority',
{
    // useMongoClient: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

mongoose.Promise=global.Promise;

app.use(morgan('dev'));
app.use('/upload', express.static('upload'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Header",
                "Origin, X-Requested-with, Content-Type, Accept, Authorization");
    if (req.method === 'OPTION') {
        res.header("Access-Control-Allow-Method","PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use('/products', productsRouts);
app.use('/orders', ordersRouts);
app.use('/user', userRouter);


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
