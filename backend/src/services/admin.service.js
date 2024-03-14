const knex = require("../database/knex");

function makeAdminService() {
    async function loginAdmin(admin_name, admin_password) {
        const admin = knex("admin")
            .where({
                admin_name,
                admin_password,
            })
            .first();
        return admin;
    }

    return {
        loginAdmin,
    };
}

module.exports = makeAdminService;
