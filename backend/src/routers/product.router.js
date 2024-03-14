const express = require("express");
const productController = require("../controllers/product.controller");

const { methodNotAllowed } = require("../controllers/errors.controller");

const router = express.Router();

router
    .route("/")
    .get(productController.getProductsByFilter)
    .post(productController.createProduct)
    .delete(productController.deleteAllProducts)
    .all(methodNotAllowed);

router
    .route("/:id")
    .get(productController.getProduct)
    .put(productController.updateProduct)
    .delete(productController.deleteProduct)
    .all(methodNotAllowed);

module.exports = router;
