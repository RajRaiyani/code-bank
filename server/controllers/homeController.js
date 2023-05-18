// const mongoose = require("mongoose");
const Question = require("./../models/question");
const Solution = require("./../models/solution");
const User = require("./../models/user");
const List = require("./../models/list");



//================================================================


exports.getAllQuestions = async (req,res) => {
	try{
		var data = await Question.find({},{categories:0});
	}catch(error){
		return res.json({status:"X",message:"something went wrong."})
	}

	res.json({status:"OK",data});
}

//================================================================

exports.getOneQuestion = async (req,res) => {
	try{
		var data = await Question.findOne({_id:req.params.id},{});
		var solutions = await Solution.find({question_id:req.params.id},{question_id:0});
		if(!data) return res.json({status:"NOT_EXIST",message:"question does not exist."});
	}catch(error){
		return res.json({status:"X",message:"something went wrong.",error})
	}
	
	res.json({status:"OK",data:{...data._doc,solutions}});
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