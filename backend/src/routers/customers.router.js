const express = require("express");
const customersController = require("../controllers/customers.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");

const router = express.Router();

router
    .route("/")
    .get(customersController.getContactsByFilter)
    .all(methodNotAllowed);
router
    .route('/:id')
    .get(customersController.getCustomer)
    .delete(customersController.deleteContact)
    .put(customersController.updateContact)

module.exports = router;
