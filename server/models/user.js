const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const schema = new mongoose.Schema({
	username:{
		type:String,
		unique:true,
		require:true
	},
	email:{
		type:String,
		unique:true,
		require:true
	},
	password:String,
	role:{
		type:String,
		default:"user"
	},
	updateDBy:{
		type: mongoose.Schema.Types.ObjectId,
		ref:"user"
	},
	isDeleted:{
		type:Boolean,
		default:false
	}
} , { timestamps: true })

schema.pre("save", async function(next){
	if (!this.isModified("password")) {
		return next();
	}else{
		this.password = await bcrypt.hash(this.password, 7);
	}
})

module.exports = mongoose.model("user",schema);