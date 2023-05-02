const jwt = require("jsonwebtoken");

const isLoggedIn = (req, res, next) => {

	// optional chaining -> JS's topic
	var token = req.headers.token || req.body.token;

	if (!token) {
		return res.json({ status: "Tm",message:"Token is messing." });
	}
	
	try {
		var payLoad = jwt.verify(token, process.env.token_key);
		req.user_id = payLoad.user_id;
		next();
	} catch (e) {
		return res.json({ status: "Te" , message:"Token is expired.",e});
	}


}

module.exports = isLoggedIn;