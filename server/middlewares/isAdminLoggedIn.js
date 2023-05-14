const jwt = require("jsonwebtoken");

const isAdminLoggedIn = (req,res,next)=>{
	
	var token = req.headers.token || req.body.token;
	if(!token){
		return res.json({status:"Tm",message:"Token is missing."});
	}

	try{
		var payLoad = jwt.verify(token,process.env.ADMIN_TOKEN_KEY);
		req.user_id=payLoad.user_id;
		if(payLoad.role === "admin"){
			next();
		}else{
			return res.json({status:"ACCESSDENIED",message:"Not an Admin."})
		}
		
	}catch (error){
		return res.json({status:"Te",message:"Token has been expired",error});
	}
	
}
module.exports = isAdminLoggedIn;