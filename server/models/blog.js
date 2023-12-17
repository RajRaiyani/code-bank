const mongoose = require("mongoose");

const schema = new mongoose.Schema({
	user_id:{
		type: mongoose.Schema.Types.ObjectId,
		ref:"user"
	},
	data:String,
	date:{
		type : Date,
		require : true,
		default : Date.now
	}
})

module.exports = mongoose.model("comment",schema);