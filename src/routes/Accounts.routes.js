const { Router } = require('express');
const router = Router();
const { getAllAccounts, getAccountById, deleteAccount, updateAccount } = require('../controllers/Accounts.controller');

router.get('/:id', getAccountById);
router.get('/', getAllAccounts);
router.delete('/:id', deleteAccount);
router.put('/:id', updateAccount);

module.exports = router;