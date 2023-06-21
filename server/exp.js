
// var Storage ={
// 	language:["java","python","c","c++"]
// }


var arr = [3,3,5,2,1,3,5,6,2,3,5,2];
console.log([...new Set(arr)]);



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
