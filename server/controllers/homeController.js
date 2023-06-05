// const mongoose = require("mongoose");
const Question = require("./../models/question");
const Solution = require("./../models/solution");
const Comment = require("./../models/comment");
const User = require("./../models/user");
const List = require("./../models/list");
const Like = require("./../models/like");



//================================================================


exports.getAllQuestions = async (req,res) => {
	try{
		var data = await Question.find({},{categories:0}).sort({number:1});
	}catch(error){
		return res.json({status:"X",message:"something went wrong."})
	}

	res.json({status:"OK",data});
}

//================================================================

exports.getOneQuestion = async (req,res) => {
	try{
		var data = await Question.findOne({_id:req.params.id},{});

		if(!data) return res.json({status:"NOT_EXIST",message:"question does not exist."});

		var solutions = await Solution.find({question_id:req.params.id},{question_id:0});
		var comments = (await Comment.find({question_id:req.params.id}).populate({path:"user_id",select:"_id name"}));
		comments = comments.map(element =>{
			element = element._doc;
			element.user = element.user_id;
			delete element.user_id;
			return element;
		})
		
	}catch(error){
		return res.json({status:"X",message:"something went wrong.",error})
	}
	
	res.json({status:"OK",data:{...data._doc,solutions,comments}});
}

//=======================================================

exports.likeQuestion = async (req,res) => {
	var question_id = req.params.id;
	var user_id = req.user_id;
	if(!(question_id && user_id)){
		return res.json({status:"MISSING_FIELD",message:"either question Id or user Id is missing."});
	}
	var like = false;
	try{
		if(!(await Like.findOneAndRemove({user_id,question_id}))){

			if(!(await Question.updateOne({_id:question_id},{$inc:{likes:1}}))){
				return res.json({status:"NOT_EXIST",message:"No such question Exist."});
			}
			await Like.create({user_id,question_id});
			
			like = true;
		}else{
			if(!(await Question.updateOne({_id:question_id},{$inc:{likes:-1}}))){
				return res.json({status:"NOT_EXIST",message:"No such question Exist."});
			}
		}
	}catch(error){
		return res.json({status:"X",message:"something went wrong while adding like to question.",error})
	}
	res.json({status:"OK",like});
	
}

//===================================
exports.commentOnQuestion = async (req,res)=>{
	var data = req.body.data;
	var question_id = req.params.id;
	var user_id = req.user_id;
	if(!(question_id && user_id && data)){
		return res.json({status:"MISSING_FIELD",message:"either question Id or user Id is missing."});
	}
	try{
		var data = await Comment.create({user_id,question_id,data});
		res.json({status:"OK",data});
	}catch(error){
		return res.json({status:"X",message:"something went wrong while commenting on question.",error})
	}
}







//==================== All Users =================================

exports.getAllUsers = async (req,res) => {

	try{
		var data = await User.find({},{email:1,name:1,role:1});
		res.json({status:"OK",data});
	}catch(error){
		res.json({status:"X",message:"something went wrong while fetching the users.",error});
	}
	
}

//================================================================


exports.getOneList = async (req,res) => {
	try{
		var data = await List.findOne({listName:req.params.name});
		if(!data){
			return res.json({status:"NOT_EXIST",message:"list does not exist."});
		}
		res.json({status:"OK",data});
	}catch(error){
		res.json({status:"X",message:"something went wrong while fetching list.",error})
	}
}

//=================================================================

exports.getAllLists = async (req,res) => {
	try{
		var data = await List.find({},{listName:1});
		res.json({status:"OK",data});
	}catch(error){
		res.json({status:"X",message:"something went wrong while fetching lists.",error})
	}
}