const express = require("express");
const router  = express.Router();

const isLoggedin = require("./../middlewares/isLoggedIn");
const {addQuestion, deleteQuestion}  = require("./../controllers/admin/questionController");

router.route("/question/add").post(isLoggedin,addQuestion)
router.route("/question/delete").delete(deleteQuestion);

module.exports = router;