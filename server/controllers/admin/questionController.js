
const Question = require("./../../models/question");
const Solution = require("./../../models/solution");






// ==========================================================================

exports.addQuestion = async (req,res)=>{
	var {number,question,categories,level,solutions} = req.body;
	
	if(!(number && question && categories && level && solutions)){
		return res.json({status:"Fr",message:"all fileds are required."});
	}

	if(await Question.findOne({number})){
		return res.json({status:"Qe",message:"this number is already assigned."})
	}

	try{
		var data = await Question.create({number,question,categories,level});
		for(let i = 0;i<solutions.length;i++){
			await Solution.create({question_id:data._id,language:solutions[i].language,code:solutions[i].code});
		}
	}catch(error){
		return res.json({status:"X",message:"something went wrong..",error});
	}

	res.json({status:"ok",data});
}

//==========================================================================

exports.deleteQuestion = async (req,res)=>{

	try{
		await Solution.deleteMany({question_id:req.body.question_id});
		await Question.deleteOne({_id:req.body.question_id});
		res.json({status:"ok"});

	}catch(error){
		return res.json({status:"X",message:"something went wrong..",error});
	}
}

//==========================================================================