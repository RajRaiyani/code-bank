exports.test = (req,res)=>{
	console.log("hit");

	console.log(req.headers);
	res.send("hit");
}