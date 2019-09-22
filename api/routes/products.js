const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const productController = require('../controller/products');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './upload/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
}); 

const fileFilter = (req, file, cb) =>{
    //reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({
    storage: storage, 
    limits: {
        fieldSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

//mengambil semua data
router.get('/', productController.product_get_all);

//post atau mengentry atau membuat semua data 
router.post('/', checkAuth, upload.single('productImage'), productController.product_create_product);

//mengambil satu data dengan id
router.get('/:productsId', productController.product_get_product);

//update data dengan id
router.patch('/:productsId', checkAuth, productController.product_update_product);

//delete data dengan id
router.delete('/:productsId', checkAuth, productController.product_delete_product);

module.exports = router;