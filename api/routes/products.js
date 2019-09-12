const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/products'); 

//mengambil semua data
router.get('/', (req, res, next)=>{
    Product.find()
        .exec()
        .then(docs =>{
            console.log(docs);
            // if (docs.length >= 0) {
                res.status(200).json(docs);
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
    product.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: 'hendel post request ke produck',
            createdProduct: result
        });
    })
    .catch(err=> {
        console.log(err);
        res.status(200).json({
            error: err
        });
    });
});

//mengambil satu data dengan id
router.get('/:productsId', (req,res,next)=>{
    const id = req.params.productsId;
    Product.findById(id)
    .exec()
    .then(doc =>{
        console.log("From Database",doc);
        if (doc) {
            res.status(200).json(doc);            
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
            res.status(200).json(result);
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
            res.status(200).json(result);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;