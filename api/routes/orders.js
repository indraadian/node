const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.status(200).json({
        message: 'order were patch'
    });
});

router.post('/', (req, res, next) =>{
    const order = {
        productId: req.body.productId,
        quatity: req.body.quatity
    }
    res.status(201).json({
        message: 'order was created'
    });
});

router.get('/:orderId', (req, res ,next)=>{
    res.status(200).json({
        message: 'oerder details',
        orderId: req.params.orderId
    });
});

router.delete('/:orderId', (req, res ,next)=>{
    res.status(200).json({
        message: 'oerder deleting',
        orderId: req.params.orderId
    });
});

module.exports = router;