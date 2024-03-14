const makeCustomersService = require("../services/customers.service");
// const bcrypt = require('bcryptjs');
const ApiError = require("../api-error");

// New
async function getContactsByFilter(req, res, next) {
  const customerService = makeCustomersService();
  customerService.showCustomerAll((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
}

async function deleteContact(req, res, next) {
  try {
    const contactsService = makeCustomersService();
    const deleted = await contactsService.deleteContact(req.params.id);
    if (!deleted) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send({ message: "Contact was delete successfully" });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Could not delete contact with id=${req.params.id}`)
    );
  }
}

async function updateContact(req, res, next) {
  if (Object.keys(req.body).length == 0) {
    return next(new ApiError(400, "Data to update can not be empty"));
  }

  try {
    const contactsService = makeCustomersService();
    const updated = await contactsService.updateContact(
      req.params.id,
      req.body
    );
    if (!updated) {
      return next(new ApiError(404, "Customer not found"));
    }
    return res.send({ message: "Customer was update successfully" });
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error updating contact with id=${req.params.id}`)
    );
  }
}

async function getCustomer(req, res, next) {
  try {
    const contactsService = makeCustomersService();
    const customer = await contactsService.getContactsById(req.params.id);
    if (!customer) {
      return next(new ApiError(404, "Contact not found"));
    }
    return res.send(customer);
  } catch (error) {
    console.log(error);
    return next(
      new ApiError(500, `Error retrieving customer with id=${req.params.id}`)
    );
  }
}

module.exports = {
    getContactsByFilter,
    deleteContact,
    updateContact,
    getCustomer,
    
};
