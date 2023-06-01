const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	number:{
		type:Number,
		required:true,
		unique:true
	},
	question:String,
	categories:[String],
	likes:{
		type:Number,
		default:0	
	},
	level:{
		type:String,
		enum:["Hard","Medium","Easy"]
	},
})

module.exports = mongoose.model("question",schema);
