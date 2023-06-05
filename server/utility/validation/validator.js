const Info = require("./validationInfo");

const validator = {
	validate : function(property,value) {
		if(!Info[property])return false;
		if(Info[property].pattern.test(value))return true;
		return false;
	},
	info : function(property){
		if(!Info[property])return;
		return Info[property];
	}
}



module.exports = validator;