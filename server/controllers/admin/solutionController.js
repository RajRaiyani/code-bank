const Question = require("./../../models/question");
const Solution = require("./../../models/solution");
const Validator = require("./../../utility/validation/validator");

const Storage = require("./../../utility/memory/storage");

exports.addSolution = async (req, res) => {
	var { question_id, title, language, code } = req.body;

	if (!(question_id && language && title && code))
		return res.json({ status: "MISSING", message: "Solution ID is missing." })

	try {
		if (! await Question.exists({ _id: question_id }))
			return res.json({ status: "NOT_EXIST", message: "No question exists for this solution." });
		if (!Validator.validate("solutionTitle", title))
			return res.json({ status: "INVALID", message: "Solution's Title is not valid." });

		let isValidLanguage = false;
		for (let val of Storage.language) {
			if (val === language) {
				isValidLanguage = true;
				break;
			}
		}
		
		if (!isValidLanguage)
			return res.json({ status: "INVALID", message: "Solution's Language is not valid." });

		var data = await Solution.create({ question_id, language, title, code });
		res.json({ status: "OK", data });

	} catch (error) {
		return res.json({ status: "X", message: "something went wrong in adding solution", error });
	}
}

exports.deleteSolution = async (req, res) => {
	var { solution_id } = req.body;
	if (!solution_id) return res.json({ status: "MISSING", message: "solution_id is missing." });

	try {

		await Solution.deleteOne({ _id: solution_id });
		res.json({ status: "OK" })

	} catch (error) {
		res.json({ status: "X", message: "something went wrong while deleting solution", error });
	}
}


exports.editSolution = async (req, res) => {
	var { solution_id, title, language, code } = req.body;
	if (!solution_id)
		return res.json({ status: "MISSING", message: "solution ID is missing." });

	try {
		var data = await Solution.findOne({ _id: solution_id });
		if (!data) return res.json({ status: "NOT_EXIST", message: "solution doesn't exist" });
	} catch (error) {
		res.json({ status: "X", message: "something went wrong while updating solution (1)", error });
	}

	if (title) {
		if (!Validator.validate("solutionTitle", title))
			return res.json({ status: "INVALID", message: "Solution's Title is not valid." });
		data.title = title;
	}
	if (language) {
		let isValidLanguage = false;
		for (let val of Storage.language) {
			if (val === language) {
				isValidLanguage = true;
				break;
			}
		}
		data.language = language;
	}
	if (code) data.code = code;

	try {
		await data.save();
		res.json({ status: "OK" });
	} catch (error) {
		res.json({ status: "X", message: "something went wrong while updating solution (2)", error });
	}

}


