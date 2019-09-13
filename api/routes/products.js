const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products'); 

//mengambil semua data
router.get('/', (req, res, next)=>{
    Product.find()
        .select('name price _id')
        .exec()
        .then(docs =>{
            const response = {
                count: docs.length,
                products: docs.map(doc =>{
                    return{
                        name: doc.name,
                        price: doc.price,
                        _id: doc._id,
                        _request:{
                            type: 'GET',
                            url: 'http://localhost:3000/products/'+ doc._id

                        }
                    }
                })
            };
            // console.log(docs);
            // if (docs.length >= 0) {
                res.status(200).json(response);
            // }else{
            //     res.status(404).json({
            //         message: 'No entryfound'
            //     });
            // }
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//post atau mengentry atau membuat semua data 
router.post('/', (req, res, next)=>{
    const product = new Product({
         _id: new mongoose.Types.ObjectId(),
         name: req.body.name,
         price: req.body.price
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created product successfully',
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    id: result._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/prducts/'+result._id
                    }
                }
            });
    })
    .catch(err=> {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//mengambil satu data dengan id
router.get('/:productsId', (req,res,next)=>{
    const id = req.params.productsId;
    Product.findById(id)
    .select('name price _id')
    .exec()
    .then(doc =>{
        console.log("From Database",doc);
        if (doc) {
            res.status(200).json({
                products : doc,
                request:{
                    type: 'GET',
                    url: 'http://localhost:3000/products/'+doc._id
                }
            });            
        }else{
            res.status(404).json({message: "No valid entry found for provided ID"});
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    });
});

//update data dengan id
router.patch('/:productsId', (req,res,next)=>{
    const id = req.params.productsId;
    const updateops = {};
    for (const ops of req.body) 
    {
        updateops[ops.propName] = ops.value;
    }
    Product.update(
        {
            _id: id
        },
        {
            $set: updateops
        })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'Product is updated',
                request:{
                    type: 'PATCH',
                    url: 'http://localhost:3000/products'+ id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//delete data dengan id
router.delete('/:productsId', (req,res,next)=>{
    const id = req.params.productsId;
    Product.remove({_id: id})
        .exec()
        .then(result =>{
            res.status(200).json({
                message: 'Products is deled',
                requests: {
                    type: 'GET',
                    url: 'http://localhost:3000/product/',
                    body: {
                        name: 'String', price: 'Number'
                    }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;