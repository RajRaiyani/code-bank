
// Configuration
require("dotenv").config();
require("./config/database").connect();
require("./utility/memory/storage").reloade(); // get the storage ready.



// Main Imports
const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authentication = require("./routes/authentication");
const admin = require("./routes/admin");
const home = require("./routes/home");
const test = require("./routes/test");

app.use("/api/v1/home", home);
app.use("/api/v1/authentication", authentication);
app.use("/api/v1/admin", admin);
app.use("/api/v1/test", test);

module.exports = app;


