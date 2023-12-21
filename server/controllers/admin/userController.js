const blog = require("../../models/blog");
const question = require("../../models/question");
const comment = require("../../models/comment");

const User = require("./../../models/user");
const blogcomment = require("../../models/blogcomment");
const bloglike = require("../../models/bloglike");
const like=require("../../models/like");


// ===================================================

exports.getOneUser = async (req,res)=>{

	try{
		var data = await User.findOne({_id:req.params.id});
		res.json({status:"OK",data});
	}catch(error){
		res.json({status:"X",message:"somethin went wrong while fetching one user",error});
	}
}

// ==================================================

exports.changeRole = async (req,res)=>{
	try{
		var data = await User.findOne({_id:req.params.id});
		var {newrole}=req.body;
		data.role=newrole;
		await data.save();
		res.json({status:"OK",data});
	}catch(error){
		res.json({status:"X",message:"somethin went wrong while changing User's role",error});
	}
}

// ====================================

exports.deleteUser = async (req,res)=>{
	try{

		var userdata= await User.find({_id:req.params.id});
		if(userdata.role==="user")
		{

		var data = await User.findOneAndRemove({_id:req.params.id});
		 await question.deleteMany({user_id:req.params.id});
		 await blog.deleteMany({user_id:req.params.id});
		 await comment.deleteMany({user_id:req.params.id});
		 await blogcomment.deleteMany({user_id:req.params.id});
		 await bloglike.deleteMany({user_id:req.params.id});
		 await like.deleteMany({user_id:req.params.id});
		}
		else
		{
			
			return res.json({status:"OK",message:"you can't delete this superuser or admin"});
		}

		if(!data){
			return res.json({status:"NOT_EXIST",message:"User does not exist."})
		}
		res.json({status:"OK",data});
	}catch(error){
		res.json({status:"X",message:"somethin went wrong while deleting User",error});
	}
}