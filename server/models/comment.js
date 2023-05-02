const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	user:mongoose.Schema.Types.ObjectId,
	question_id:mongoose.Schema.Types.ObjectId,
	data:String
})

module.exports = mongoose.model("comment",schema);