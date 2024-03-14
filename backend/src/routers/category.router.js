const express = require("express");
const categoryController = require("../controllers/product.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");

const router = express.Router();

router
    .route("/")
    .get(categoryController.getCategoriesByFilter)
    .post(categoryController.createCategory)
    .all(methodNotAllowed);

router
    .route("/:id")
    .get(categoryController.getCategory)
    .put(categoryController.updateCategory)
    .delete(categoryController.deleteCategory)
    .all(methodNotAllowed);

module.exports = router;
