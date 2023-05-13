const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	listNumber:Number,
	categories:[String],
	languages:[String],
})

module.exports = mongoose.model("list",schema);