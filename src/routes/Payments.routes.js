const { Router } = require('express');
const { verifyTokenSeller } = require('../middlewares/AuthJWT');
const { getAllPayments, createPayment, deletePayment, updatePayment } = require('../controllers/Payments.controller');
const router = Router();


router.get('/', verifyTokenSeller, getAllPayments);
router.delete('/:id', verifyTokenSeller, deletePayment);
router.post('/', verifyTokenSeller, createPayment);
router.put('/:id', verifyTokenSeller, updatePayment);

module.exports = router;