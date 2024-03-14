const knex = require("../database/knex");
// const Paginator = require("./paginator");

function makeCustomersService() {
    function readCustomer(payload) {
        const customer = {
            customer_name: payload.customer_name,
            customer_password: payload.customer_password,
            customer_email: payload.customer_email,
            customer_phone: payload.customer_phone,
            customer_address: payload.customer_address,
        };
        // Remove undefined fields
        Object.keys(customer).forEach(
            (key) => customer[key] === undefined && delete customer[key]
        );
        return customer;
    }
    // New
    async function showCustomerAll(result) {
      try {
        const customer = await knex.select().from("customer");
        result(null, customer);
      } catch (error) {
        console.error(error);
        result(error, null);
      }
    }
    
    async function getContactsById(id) {
        return knex('customer').where('customer_id', id).select('*').first();
    }

    async function deleteContact(id) {
        return knex('customer').where('customer_id', id).del();
    }

    async function updateContact(id, payload) {
        const update = readCustomer(payload);
        return knex('customer').where('customer_id', id).update(update);
    }

    return {
        deleteContact,
        showCustomerAll,
        updateContact,
        getContactsById,
    };
}

module.exports = makeCustomersService;
