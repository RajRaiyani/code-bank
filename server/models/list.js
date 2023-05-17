const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	listName:String,
	list:[String],
})

module.exports = mongoose.model("list",schema);