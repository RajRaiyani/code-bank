const express = require("express");
const router  = express.Router();

const isAdminLoggedIn = require("./../middlewares/isLoggedIn");
const {addQuestion, deleteQuestion}  = require("./../controllers/admin/questionController");

router.route("/question/add").post(isAdminLoggedIn,addQuestion)
router.route("/question/delete").delete(deleteQuestion);

module.exports = router;