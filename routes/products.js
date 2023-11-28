var express = require("express");
const product_controlers = require("../controllers/productController");
var router = express.Router();
var passport = require("passport");
/* GET products */
router.get("/", product_controlers.product_view_all_Page);
// GET request for one product.
router.get("/products/:id", product_controlers.product_detail);
router.put("/products/:id", product_controlers.product_update_put);
/* GET detail product page */
router.get("/detail", product_controlers.product_view_one_Page);
/* GET create product page */
router.get("/create", product_controlers.product_create_Page);
/* GET create update page */
// A little function to check if we have an authorized user and continue on
// redirect to login.
const secured = (req, res, next) => {
  if (req.user) {
    return next();
  }
  res.redirect("/login");
};
/* GET update product page */
router.get("/update", secured, product_controlers.product_update_Page);
router.post("/login", passport.authenticate("local"), function (req, res) {
  res.redirect("/");
});

/* GET delete product page */
router.get("/delete", product_controlers.product_delete_Page);

module.exports = router;
