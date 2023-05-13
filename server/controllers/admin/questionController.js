
const Question = require("./../../models/question");
const Solution = require("./../../models/solution");






// ==========================================================================

exports.addQuestion = async (req,res)=>{
	var {number,question,categories,level,solutions} = req.body;
	
	if(!(number && question && categories && level && solutions)){
		return res.json({status:"MISSING",message:"all fileds are required."});
	}

	if(await Question.exists({number})){
		return res.json({status:"EXIST",message:"this number is already assigned."})
	}

	try{
		var data = await Question.create({number,question,categories,level});
		for(let i = 0;i<solutions.length;i++){
			await Solution.create({question_id:data._id,language:solutions[i].language,code:solutions[i].code});
		}
	}catch(error){
		return res.json({status:"X",message:error.message,error});
	}

	res.json({status:"OK",data});
}

//==========================================================================

exports.deleteQuestion = async (req,res)=>{

	try{
		await Solution.deleteMany({question_id:req.body.question_id});
		await Question.deleteOne({_id:req.body.question_id});
		res.json({status:"OK"});

	}catch(error){
		return res.json({status:"X",message:error.message,error});
	}
}

//==========================================================================


exports.editQuestion = async (req,res)=>{

	var {question_id,number,question,categories,level} = req.body;

	if(!question_id) return res.json({status:"M",message:"question id is required."});
	
	var data = await Question.findOne({_id:question_id});

	if(!data) return res.json({status:"NOTEXIST",message:"Question does not exist."});

	if(number != data.number){
		if(await Question.exists({number})){
			return res.json({status:"EXIST",message:"this number is already assigned."})
		}
	}

	data.question = question;
	data.number = number;
	data.categories = categories;
	data.level = level;
	
	
	try{
		await data.save();
		res.json({status:"OK",data});
	}catch(error){
		res.json({status:"X",message:error.message,error});
	}
}