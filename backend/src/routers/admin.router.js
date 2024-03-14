const express = require("express");
const adminController = require("../controllers/admin.controller");
const { methodNotAllowed } = require("../controllers/errors.controller");

const router = express.Router();

router.route("/").get(adminController.loginAdmin).all(methodNotAllowed);
router.route("/logout").get(adminController.logoutAdmin).all(methodNotAllowed);
router
    .route("/session")
    .get(adminController.getSessionAdmin)
    .all(methodNotAllowed);

module.exports = router;
