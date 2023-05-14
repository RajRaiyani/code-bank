// const mongoose = require("mongoose");
const Question = require("./../models/question");
const Solution = require("./../models/solution");
const User = require("./../models/user");



//======================================================
exports.getAllQuestions = async (req,res) => {
	console.log("hit question");
	try{
		var data = await Question.find({},{categories:0});
		console.log(data);
	}catch(error){
		return res.json({status:"X",message:"something went wrong."})
	}

	res.json({status:"OK",data});
}

//=================================================

exports.getOneQuestion = async (req,res) => {
	console.log("hit");
	try{
		var data = await Question.findOne({_id:req.params.id},{});
		var solutions = await Solution.find({question_id:req.params.id},{question_id:0});
	}catch(error){
		return res.json({status:"X",message:"something went wrong.",error})
	}
	
	res.json({status:"OK",data:{...data._doc,solutions}});
}

//======================================================

exports.getAllUsers = async (req,res) => {

	try{
		var data = await User.find({},{email:1,name:1,role:1});
		res.json({status:"OK",data});
	}catch(error){
		res.json({status:"X",message:"something went wrong while fetching the users.",error});
	}
	
}