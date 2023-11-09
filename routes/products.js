var express = require('express');
const product_controlers= require('../controllers/productController');
var router = express.Router();
/* GET costumes */
router.get('/', product_controlers.product_view_all_Page );
module.exports = router;
