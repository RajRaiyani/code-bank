// const mongoose = require("mongoose");
const Question = require("./../models/question");
const Solution = require("./../models/solution");


exports.GetAllQuestions = async (req,res) => {
	try{
		var data = await Question.find({},{categories:0});
	}catch(error){
		return res.json({status:"X",message:"something went wrong."})
	}

	res.json({status:"ok",data});
}


exports.GetOneQuestions = async (req,res) => {
	try{
		var data = await Question.findOne({_id:req.params.id},{});
		var solutions = await Solution.find({question_id:req.params.id},{question_id:0});
	}catch(error){
		return res.json({status:"X",message:"something went wrong."})
	}
	
	res.json({status:"ok",data:{...data._doc,solutions}});
}