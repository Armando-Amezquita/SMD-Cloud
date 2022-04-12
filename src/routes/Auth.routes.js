const { Router } = require('express');
const { signinAccount, signupAccount, signinSeller } = require('../controllers/Auth.controller');

const router = Router();

router.post('/signinAccount', signinAccount);
router.post('/signupAccount', signupAccount);
router.post('/signinSeller', signinSeller);

module.exports = router;
