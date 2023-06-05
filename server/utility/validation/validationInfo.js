const validationInfo = {
	username:{
		pattern : /^[a-zA-Z0-9_]{3,20}$/,
		description : "username info"
	},
	email:{
		pattern : /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/,
		description : "email validation info"
	}
}

module.exports = validationInfo;