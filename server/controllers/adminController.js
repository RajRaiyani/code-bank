const question = require("./../models/question");

exports.addQuestion = (req,res)=>{

	var {number,question,catagory,level,solution} = req.body;
	
	if(!(number && question && catagory && level && solution)){
		return res.json({status:"Fr",message:"all fileds are required."});
	}

	var result = question.create({number,question,catagory,level,solution});
	
	res.json({status:"test",result});

}