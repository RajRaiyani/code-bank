const nodemailer = require("nodemailer");




const sendMail = async (email, subject, text) => {
	let testAccount = await nodemailer.createTestAccount();
	console.log(testAccount.user,testAccount.pass)

	let transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: testAccount.user, // generated ethereal user
			pass: testAccount.pass, // generated ethereal password
		},
	});

	const options = {
		frome: testAccount.user,
		to: email,
		subject,
		text
	}

	var info = await transporter.sendMail(options);
	return info;
}

module.exports = sendMail;
