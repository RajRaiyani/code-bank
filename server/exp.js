
// var Storage ={
// 	language:["java","python","c","c++"]
// }

var language = "java";
var arr = [{language:"python"}];
for(let val of arr){
	let {language} = val;
	console.log(language);
}



// var validateLanguage=function(...languages){
// 	let isValid = true;
// 	for(let lan of languages){
// 		console.log(lan)
// 		let isPresent = false;
// 		for (let val of Storage.language) {
// 			console.log(val)
// 			if (lan === val) {
// 				isPresent = true;
// 				break;
// 			}
// 		}
// 		if(!isPresent){
// 			isValid = false;
// 			break;
// 		}
// 	}
	
// 	return isValid;
// }


// console.log(validateLanguage("python","jsdava"))







   




// const mongoose = require("mongoose");

// const schema = new mongoose.Schema({
// 	number:Number,
// 	name:{
// 		type:String,
// 		required:[true,"hello this is requried..."]
// 	},
	
// })


// var Test = mongoose.model("test",schema);


// async function go(){
//   try{
//     await Test.create({number:7,name:"RP"});
//   }catch(error){

//     console.log(JSON.stringify(error,null,30));
//   }

// }
// go();
