const user = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// ------------------- Sing in -----------------------
exports.SignIn = async (req,res)=>{
	var {name,email,password,cpassword} = req.body;

	if(!(name && email && password && cpassword)){
		res.json({status:"Fr",messgae:"all fildes are required."})
		return;
	}

	if(cpassword !== password){
		res.json({status:"Pm",message:"confirm password should match."});
		return;
	}

	if(await user.findOne({email})){
		res.json({status:"Ue",message:"User allrady exist."});
		return;
	}
	
	var data = await user.create({name,email,password});

	data.password = undefined;

	res.json({status:"ok",data});
}



// ------------------------ Log in ---------------------------
exports.LogIn = async (req,res)=>{

	var {email,password} = req.body;

	if(!(email && password)){
		return res.json({status:"Fr",message:"all fileds are required."});
	}

	var data = await user.findOne({email});

	if(!data){
		return res.json({status:"Une",message:"User does not exist"});
	}

	if(await bcrypt.compare(password,data.password)){

		var token = jwt.sign({user_id:data._id,email},process.env.TOKEN_KEY,{expiresIn:"5h"});

		res.json({
			status:"ok",
			token
		});

	}else{
		res.json({status:"Pinv",message:"password is invalid."});
	}
}



//------------------- Admin Log in -------------------------

exports.AdminLogIn = async (req,res)=>{
	
	var {email,password} = req.body;
	if(!(email && password)){
		return res.json({status:"Fr",message:"all fileds are required."})
	}	
	var data = await user.findOne({email});

	if(!data){
		return res.json({status:"Une",message:"Admin does not exist"});
	}

	if(await bcrypt.compare(password,data.password)){
		var token = jwt.sign({user_id:data._id,email:data.email},process.env.ADMIN_TOKEN_KEY,{expiresIn:"5h"});
		res.json({status:"ok",token});
	}else{
		res.json({status:"Pinv",message:"Invalid password"});
	}
}