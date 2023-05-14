const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// ------------------- Sing in -----------------------
exports.SignIn = async (req,res)=>{
	var {name,email,password,cpassword} = req.body;

	if(!(name && email && password && cpassword)){
		return res.json({status:"MISSING_FIELD",messgae:"all fildes are required."});
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
		return res.json({status:"X",message:"something went wrong in creating User",error});
	}
	

	data.password = undefined;

	res.json({status:"OK",data});
}



// ------------------------ Log in ---------------------------
exports.LogIn = async (req,res)=>{

	var {email,password} = req.body;

	if(!(email && password)){
		return res.json({status:"MISSING_FIELD",message:"all fileds are required."});
	}

	var data = await User.findOne({email});

	if(!data){
		return res.json({status:"NOT_EXIST",message:"User does not exist"});
	}

	if(await bcrypt.compare(password,data.password)){

		var token = jwt.sign({user_id:data._id,email,role:data.role},process.env.TOKEN_KEY,{expiresIn:"5h"});
		res.json({status:"OK",role:data.role,token});
		
	}else{
		res.json({status:"INVALID_PW",message:"password is invalid."});
	}
}

// =============================================================

