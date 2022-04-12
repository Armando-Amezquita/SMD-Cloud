const { Router } = require('express');
const { verifyToken, isModerator } = require('../middlewares/AuthJWT');
const { createProduct, getProducts, getProductById, updateProductById, deleteProductById } = require('../controllers/products.contoller'); 
const router = Router();

router.get('/', getProducts);
router.post('/', [verifyToken, isModerator], createProduct);
router.get('/:productId', getProductById);
router.put('/:productId', updateProductById);
router.delete('/:productId', deleteProductById);

module.exports = router