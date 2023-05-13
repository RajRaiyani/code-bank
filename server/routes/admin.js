const express = require("express");
const router  = express.Router();

const isAdminLoggedIn = require("./../middlewares/isAdminLoggedIn");
const {addQuestion, deleteQuestion,editQuestion}  = require("./../controllers/admin/questionController");

router.route("/question/add").post(isAdminLoggedIn,addQuestion);
router.route("/question/delete").delete(isAdminLoggedIn,deleteQuestion);
router.route("/question/edit").put(editQuestion);

module.exports = router;
