const express = require("express");
const router  = express.Router();

const {GetAllQuestions, GetOneQuestions} = require("./../controllers/homeController");

router.route("/question").get(GetAllQuestions);
router.route("/question/:id").get(GetOneQuestions);


module.exports = router;