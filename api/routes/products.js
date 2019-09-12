const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=>{
    res.status(200).json({
        message: 'hendel get request ke produck'
    });
});

router.post('/', (req, res, next)=>{
    const product = {
        name: req.body.name ,
        price: req.body.price
    };
    res.status(200).json({
        message: 'hendel post request ke produck',
        createdProduct: product
    });
});

router.get('/:productsId', (req,res,next)=>{
    const id = req.params.productsId;
    if (id === 'special') {
        res.status(200).json({
            message: 'your id is special',
            id : id
        });
    } else {
        res.status(200).json({
            message: 'you passed ID'
        });
    }
});

router.patch('/:productsId', (req,res,next)=>{
    res.status(200).json({
        message: 'updating the produck'
    });
});

router.delete('/:productsId', (req,res,next)=>{
    res.status(200).json({
        message: 'deleting the produck'
    });
});

module.exports = router;