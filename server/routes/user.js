const express = require("express");
const router  = express.Router();

const isSupperUser=require("../middlewares/isSupperUser");
const isAdminLoggedIn = require("../middlewares/isAdminLoggedIn")

const {addQuestion , getAllQuestions}=require("../controllers/user/questionController");


router.route("/addQuestion").post(isSupperUser,addQuestion);
router.route("/getQuestionByUserId").get(isSupperUser,getAllQuestions);





module.exports = router;
