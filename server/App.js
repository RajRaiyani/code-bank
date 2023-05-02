require("dotenv").config();
const cors=require("cors");
require("./config/database").connect();
const express = require("express");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const authentication = require("./routes/authentication");
const home = require("./routes/home");

app.use("/api",home);
app.use("/api/v1/authentication",authentication);

module.exports = app;


