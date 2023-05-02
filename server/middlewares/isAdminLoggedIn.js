const jwt = require("jsonwebtoken");

const isAdminLoggedIn = (req,res,next)=>{
	
	var adminToken = req.headers.token || req.body.token;
	if(!adminToken){
		return res.json({status:"Tm",message:"Token is missing."});
	}

	try{
		var payLoad = jwt.verify(adminToken,process.env.owner_token_key);
		req.user_id=payLoad.user_id;
		next();
	}catch (error){
		return res.json({status:"Te",message:"Token is expired",error});
	}
	
}
module.exports = isAdminLoggedIn;