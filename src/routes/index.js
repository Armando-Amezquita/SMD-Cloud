const { Router } = require('express');
const users = require('../models/users');
const routesProducts = require('./products.routes');
const routesAuth = require('./auth.routes');
const routesAccounts = require('./Accounts.routes');
const routesSellers = require('./Seller.routes');
const routesBoards = require('./Boards.routes');
const routesPayments = require('./Payments.routes');
const router = Router();    


router.use('/products', routesProducts);
router.use('/auth', routesAuth);
router.use('/accounts', routesAccounts);
router.use('/sellers', routesSellers);
router.use('/boards', routesBoards);
router.use('/payments', routesPayments);



module.exports = router;