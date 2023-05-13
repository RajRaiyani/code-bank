const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// ------------------- Sing in -----------------------
exports.SignIn = async (req,res)=>{
	var {name,email,password,cpassword} = req.body;

	if(!(name && email && password && cpassword)){
		return res.json({status:"MISSING",messgae:"all fildes are required."});
	}

	if(cpassword !== password){
		return res.json({status:"Pm",message:"confirm password should match."});
	}

	if(await User.findOne({email})){
		return res.json({status:"EXISTS",message:"User allrady exist."});
	}
	
	try{
		var data = await User.create({name,email,password});
	}catch(error){
		console.log("something went wrong in saving user...");
		res.json({status:"X",error});
	}
	

	data.password = undefined;

	res.json({status:"OK",data});
}



// ------------------------ Log in ---------------------------
exports.LogIn = async (req,res)=>{

	var {email,password} = req.body;

	if(!(email && password)){
		return res.json({status:"Fr",message:"all fileds are required."});
	}

	var data = await User.findOne({email});

	if(!data){
		return res.json({status:"NOTEXIST",message:"User does not exist"});
	}

	if(await bcrypt.compare(password,data.password)){

		var token;
		if(data.role === "admin"){
			token = jwt.sign({admin_id:data._id,email:data.email},process.env.ADMIN_TOKEN_KEY,{expiresIn:"5h"});
			res.json({status:"OK",role:"admin",token});
		}else{
			token = jwt.sign({user_id:data._id,email},process.env.TOKEN_KEY,{expiresIn:"5h"});
			res.json({status:"OK",role:"user",token});
		}
		
	}else{
		res.json({status:"INVALID",message:"password is invalid."});
	}
}

// =============================================================

