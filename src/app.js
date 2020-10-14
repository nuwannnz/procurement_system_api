require("dotenv").config();

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const usersRouter = require("./routes/users");
const itemsRouter = require("./routes/items");
const budgetsRouter = require("./routes/budgets");
const purchaseOrderRouter = require("./routes/purchaseOrder");

const db = require("./db");

// init database
db.init();

// init app
const app = express();

// apply middleware
app.use(cors({ credentials: true }));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// apply routes
app.use("/users", usersRouter);
app.use("/items", itemsRouter);
app.use("/budgets", budgetsRouter);
app.use("/orders", purchaseOrderRouter);

module.exports = app;
