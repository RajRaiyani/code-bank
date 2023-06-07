const validationInfo = {
	username:{
		pattern : /^[a-zA-Z0-9_]{3,20}$/,
		description : 'username can only contain a-z, A-Z, 0-9, and "_". username should be 3 to 20 characters long'
	},
	email:{
		pattern : /^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$/,
		description : "it should look like xyz@abc.coin"
	}
}

module.exports = validationInfo;