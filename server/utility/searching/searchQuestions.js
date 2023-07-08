const Question = require("./../../models/question");

const searchQuestions = async (str)=>{
	str = ""+str;
	var partition = str.split(" ").filter(val => val.length>0);
	var cleanString = partition.join(" ");
	console.log(cleanString);
	const data = await Question.find({$text:{$search:cleanString,}});
	return data;
	
}


module.exports = searchQuestions;