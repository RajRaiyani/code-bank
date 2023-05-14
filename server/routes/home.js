const express = require("express");
const router  = express.Router();

const isLoggedIn = require("./../middlewares/isLoggedIn");
const {getAllQuestions,getOneQuestion,getAllUsers} = require("./../controllers/homeController");

router.route("/question").get(getAllQuestions);
router.route("/question/:id").get(isLoggedIn,getOneQuestion);
router.route("/user").get(getAllUsers);


module.exports = router;