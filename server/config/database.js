const mongoose = require("mongoose");
mongoose.set('strictQuery', true);

exports.connect = () =>{
	mongoose.connect(process.env.CONNECTION_STRING_ATLAS).then(()=>{
		console.log("\x1b[32m","\bDatabase has been connected...","\x1b[0m"+"\n");
	}).catch((error)=>{
		console.log("\x1b[41m","database connection faild.","\x1b[0m"+"\n");
		console.log(error);
		process.exit(1);	
	})
}