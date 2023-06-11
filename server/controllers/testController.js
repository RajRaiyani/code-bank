
const sendMail = require("./../utility/sendMail");

exports.test = async (req, res) => {

	var temp = await sendMail("rraiyani62@gmail.com", "testing", "hello world");
	console.log(temp);
	res.json({status:"OK",temp});

}