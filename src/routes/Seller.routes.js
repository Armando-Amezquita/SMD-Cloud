const { Router } = require('express');
const { verifyToken } = require('../middlewares/AuthJWT');
const router = Router();
const { createSeller, getAllSellers, getSellerById, updateSeller, deleteSeller } = require('../controllers/Sellers.controller');

router.post('/', verifyToken, createSeller);
router.get('/:id', getSellerById);
router.get('/', getAllSellers);
router.put('/:id', verifyToken, updateSeller);
router.delete('/:id', verifyToken, deleteSeller);

module.exports = router;