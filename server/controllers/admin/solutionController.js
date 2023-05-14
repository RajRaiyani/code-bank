const Question = require("./../../models/question");
const Solution = require("./../../models/solution");

exports.addSolution = async (req,res) => {
	    var {question_id,language,code} = req.body;
		if(!(question_id && language && code))return res.json({status:"MISSING",message:"Solution ID is missing."})

		try{
			if(! await Question.exists({_id:question_id})){
				return res.json({status:"NOT_EXIST",message:"no any question exists for this solution."})
			}
			var data = await Solution.create({question_id,language,code});
			res.json({status:"OK",data});

		}catch(error){
			res.json({status:"X",message:"something went wrong in adding solution",error});
		}
}

exports.deleteSolution = async (req,res) => {
	var {solution_id} = req.body;
	if(!solution_id)return res.json({status:"MISSING",message:"solution_id is missing."});
	
	try{

		await Solution.deleteOne({_id:solution_id});
		res.json({status:"OK"})

	}catch(error){
		res.json({status:"X",message:"something went wrong while deleting solution",error});
	}
}


exports.editSolution = async (req,res) => {
	var {solution_id,language,code} = req.body;
	if(!solution_id) return res.json({status:"MISSING",message:"solution ID is missing."});
	
	try{
		var data = await Solution.findOne({_id:solution_id});
		if(!data) return res.json({status:"NOT_EXIST",message:"solution doesn't exist"});
	}catch(error){
		res.json({status:"X",message:"something went wrong while updating solution (1)",error});
	}

	
	data.language = language;
	data.code = code;
	try{
		await data.save();
		res.json({status:"OK"});
	}catch(error){
		res.json({status:"X",message:"something went wrong while updating solution (2)",error});
	}
	
}


