const express = require("express");
const cors = require("cors");

const adminRouter = require("./routers/admin.router");
const customerRouter = require("./routers/customers.router");
const productRouter = require("./routers/product.router");
const categoryRouter = require("./routers/category.router");

const session = require("express-session");
const app = express();

const {
    resourceNotFound,
    handleError,
} = require("./controllers/errors.controller");

const { SESSION_SECRET } = process.env;
app.use(
    session({ secret: SESSION_SECRET, resave: true, saveUninitialized: true })
);

app.use("/api/admin", adminRouter);
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

app.use("/api/products", productRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/customers", customerRouter);

// Handle 404 response
app.use(resourceNotFound);

// Define error-handling middleware last
app.use(handleError);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to contact book application." });
});

module.exports = app;
