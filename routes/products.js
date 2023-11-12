var express = require('express');
const product_controlers= require('../controllers/productController');
var router = express.Router();
/* GET costumes */
router.get('/', product_controlers.product_view_all_Page );
module.exports = router;
// GET request for one product.
router.get('/products/:id', product_controlers.product_detail);
router.put('/products/:id',product_controlers.product_update_put);