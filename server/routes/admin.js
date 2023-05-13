const express = require("express");
const router  = express.Router();

const isAdminLoggedIn = require("./../middlewares/isAdminLoggedIn");
const {addQuestion, deleteQuestion,editQuestion}  = require("./../controllers/admin/questionController");
const { addSolution, deleteSolution, editSolution } = require("./../controllers/admin/solutionController");

router.route("/question/add").post(isAdminLoggedIn,addQuestion);
router.route("/question/delete").delete(isAdminLoggedIn,deleteQuestion);
router.route("/question/edit").put(isAdminLoggedIn,editQuestion);

router.route("/solution/add").post(isAdminLoggedIn,addSolution);
router.route("/solution/delete").delete(deleteSolution);
router.route("/solution/edit").put(editSolution);

module.exports = router;
