require("dotenv").config();
const cors = require("cors");
require("./config/database").connect();
const express = require("express");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const authentication = require("./routes/authentication");
const admin = require("./routes/admin");
const home = require("./routes/home");
const test = require("./routes/test");

app.use("/api/v1/home", home);
app.use("/api/v1/authentication", authentication);
app.use("/api/v1/admin", admin);
app.use("/api/v1/test", test);

module.exports = app;


