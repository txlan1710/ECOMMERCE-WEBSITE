const makeProductsService = require("../services/product.service");
const ApiError = require("../api-error");

//Create and Save a new Product
async function createProduct(req, res, next) {
    if (!req.body?.product_name) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    try {
        const productsService = makeProductsService();
        const product = await productsService.createProduct(req.body);
        return res.send(product);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
}

//Create and Save a new Catrgory
async function createCategory(req, res, next) {
    if (!req.body?.category_name) {
        return next(new ApiError(400, "Name can not be empty"));
    }
    try {
        const productsService = makeProductsService();
        const category = await productsService.createCategory(req.body);
        return res.send(category);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while creating the contact")
        );
    }
}

//Retrieve products from the database
async function getProductsByFilter(req, res, next) {
    let products = [];

    try {
        const productsService = makeProductsService();
        products = await productsService.getManyProducts(req.query);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }

    return res.send(products);
}

//Retrieve categories of a from the database
async function getCategoriesByFilter(req, res, next) {
    let categories = [];

    try {
        const productsService = makeProductsService();
        categories = await productsService.getManyCategories(req.query);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while retrieving contacts")
        );
    }

    return res.send(categories);
}

//Find a single product with an id
async function getProduct(req, res, next) {
    try {
        const productsService = makeProductsService();
        const product = await productsService.getProductById(req.params.id);
        if (!product) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(product);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
}

//Find a single category with an id
async function getCategory(req, res, next) {
    try {
        const productsService = makeProductsService();
        const category = await productsService.getCategoryById(req.params.id);
        if (!category) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send(category);
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(
                500,
                `Error retrieving contact with id=${req.params.id}`
            )
        );
    }
}

// Update a product by the id in the request
async function updateProduct(req, res, next) {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data to update can not empty"));
    }

    try {
        const productsService = makeProductsService();
        const updateProduct = await productsService.updateProduct(
            req.params.id,
            req.body
        );
        if (!updateProduct) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was updated successfully" });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
}

async function updateCategory(req, res, next) {
    if (Object.keys(req.body).length == 0) {
        return next(new ApiError(400, "Data to update can not empty"));
    }

    try {
        const productsService = makeProductsService();
        const updateCategory = await productsService.updateCategory(
            req.params.id,
            req.body
        );
        if (!updateCategory) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was updated successfully" });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, `Error updating contact with id=${req.params.id}`)
        );
    }
}

async function deleteProduct(req, res, next) {
    try {
        const productsService = makeProductsService();
        const deleted = await productsService.deleteProduct(req.params.id);
        if (!deleted) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was deleted successfully" });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(
                500,
                `Could not delete contact with id=${req.params.id}`
            )
        );
    }
}

async function deleteCategory(req, res, next) {
    try {
        const productsService = makeProductsService();
        const deleted = await productsService.deleteCategory(req.params.id);
        if (!deleted) {
            return next(new ApiError(404, "Contact not found"));
        }
        return res.send({ message: "Contact was deleted successfully" });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(
                500,
                `Could not delete contact with id=${req.params.id}`
            )
        );
    }
}

// Delete all products from the database
async function deleteAllProducts(req, res, next) {
    try {
        const productsService = makeProductsService();
        const deleted = await productsService.deleteAllProducts();
        return res.send({
            message: `${deleted} contacts were deleted successfully`,
        });
    } catch (error) {
        console.log(error);
        return next(
            new ApiError(500, "An error occurred while removing all contacts")
        );
    }
}

module.exports = {
    createProduct,
    createCategory,

    getProductsByFilter,
    getCategoriesByFilter,
    getProduct,
    getCategory,

    updateProduct,
    updateCategory,

    deleteProduct,
    deleteCategory,
    deleteAllProducts,
};
