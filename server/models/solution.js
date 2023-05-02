const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	
	question_id:mongoose.Types.ObjectId,
	language:String,
	code:String
})

module.exports = mongoose.model("solution",schema);