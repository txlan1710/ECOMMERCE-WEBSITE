const makeAdminService = require("../services/admin.service");
const ApiError = require("../api-error");

async function loginAdmin(req, res, next) {
    let user = [];
    try {
        const adminService = makeAdminService();
        const admin_name = req.query.admin_name;
        const admin_password = req.query.admin_password;
        user = await adminService.loginAdmin(admin_name, admin_password);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
    req.session.user = user;
    return res.send(user);
}

async function logoutAdmin(req, res, next) {
    req.session.destroy();
    return res.send({ message: "Successfully" });
}
async function getSessionAdmin(req, res, next) {
    return res.send(req.session);
}

module.exports = {
    loginAdmin,
    logoutAdmin,
    getSessionAdmin,
};
