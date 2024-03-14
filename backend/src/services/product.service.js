const knex = require("../database/knex");
const Paginator = require("./paginator");

function makeProductService() {
    //Define functions for accessing the database
    function readProduct(payload) {
        const products = {
            product_name: payload.product_name,
            product_description: payload.product_description,
            product_price: payload.product_price,
            category_id: payload.category_id,
            product_image: payload.product_image,
        };
        // Remove undefined fields
        Object.keys(products).forEach(
            (key) => products[key] === undefined && delete products[key]
        );
        return products;
    }

    function readCategory(payload) {
        const product_categories = {
            category_name: payload.category_name,
        };
        // Remove undefined fields
        Object.keys(product_categories).forEach(
            (key) =>
                product_categories[key] === undefined &&
                delete product_categories[key]
        );
        return product_categories;
    }

    async function createProduct(payload) {
        const products = readProduct(payload);
        const [id] = await knex("products").insert(products);
        return { id, ...products };
    }

    async function createCategory(payload) {
        const product_categories = readCategory(payload);
        const [id] =
            await knex("product_categories").insert(product_categories);
        return { id, ...product_categories };
    }

    async function getManyProducts(query) {
        const { product_name, page = 1, limit = 6 } = query;
        const paginator = new Paginator(page, limit);

        let results = await knex("products")
            .select(
                knex.raw("count(product_id) OVER() AS recordsCount"),
                "product_id",
                "product_name",
                "product_description",
                "product_price",
                "product_image",
                "product_categories.category_name"
            )
            .join(
                "product_categories",
                "products.category_id",
                "=",
                "product_categories.category_id"
            )
            .where((builder) => {
                if (product_name) {
                    builder.where(
                        "products.product_name",
                        "like",
                        `%${product_name}%`
                    );
                }
            })
            .limit(paginator.limit)
            .offset(paginator.offset);

        const queryselect = await results;
        let totalRecords = 0;
        queryselect.forEach((queryselect) => {
            totalRecords = queryselect.recordsCount;
            delete queryselect.recordsCount;
        });

        return {
            metadata: paginator.getMetadata(totalRecords),
            products: queryselect,
        };
    }

    async function getManyCategories(query) {
        return knex("product_categories").select("*");
    }

    async function getProductById(id) {
        return knex("products").where("product_id", id).select("*").first();
    }

    async function getCategoryById(id) {
        return knex("product_categories")
            .where("category_id", id)
            .select("*")
            .first();
    }

    async function updateProduct(id, payload) {
        const updateProduct = readProduct(payload);
        return knex("products").where("product_id", id).update(updateProduct);
    }

    async function updateCategory(id, payload) {
        const updateCategory = readCategory(payload);
        return knex("product_categories")
            .where("category_id", id)
            .update(updateCategory);
    }

    async function deleteProduct(id) {
        return knex("products").where("product_id", id).del();
    }

    async function deleteCategory(id) {
        return knex("product_categories").where("category_id", id).del();
    }

    async function deleteAllProducts() {
        return knex("products").del();
    }

    return {
        createProduct,
        createCategory,

        getManyProducts,
        getManyCategories,
        getProductById,
        getCategoryById,

        updateProduct,
        updateCategory,

        deleteProduct,
        deleteCategory,
        deleteAllProducts,
    };
}

module.exports = makeProductService;
