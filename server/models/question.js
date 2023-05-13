const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	number:{
		type:Number,
		required:true,
		unique:true
	},
	question:String,
	likes: Number,
	categories:[String],
	level:{
		type:String,
		enum:["Hard","Medium","Easy"]
	}
})

module.exports = mongoose.model("question",schema);
