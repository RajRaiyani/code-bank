const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	user_id:mongoose.Types.ObjectId,
	question_id : mongoose.Types.ObjectId
})

module.exports = mongoose.model("like",schema);