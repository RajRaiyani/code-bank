const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	number:{
		type:Number,
		required:[true,"try another number"]
	},
	question:String,
	likes: Number,
	categories:[String],
	level:String,
})

module.exports = mongoose.model("question",schema);
