const express = require("express");
const router  = express.Router();

const isAdminLoggedIn = require("./../middlewares/isAdminLoggedIn");
const {getAllQuestions, getOneQuestion} = require("./../controllers/homeController");
const {addQuestion, deleteQuestion,editQuestion}  = require("./../controllers/admin/questionController");
const { addSolution, deleteSolution, editSolution } = require("./../controllers/admin/solutionController");
const { getOneUser, changeRole, deleteUser } = require("../controllers/admin/userController");




router.route("/user/:id").get(isAdminLoggedIn,getOneUser);
router.route("/user/:id/changeRole").put(isAdminLoggedIn,changeRole);
router.route("/user/:id/delete").delete(isAdminLoggedIn,deleteUser);

// Question related Routes

router.route("/question/add").post(isAdminLoggedIn,addQuestion);
router.route("/question/delete").delete(isAdminLoggedIn,deleteQuestion);
router.route("/question/edit").put(isAdminLoggedIn,editQuestion);

router.route("/question").get(isAdminLoggedIn,getAllQuestions)
router.route("/question/:id").get(isAdminLoggedIn,getOneQuestion)

router.route("/solution/add").post(isAdminLoggedIn,addSolution);
router.route("/solution/delete").delete(isAdminLoggedIn,deleteSolution);
router.route("/solution/edit").put(isAdminLoggedIn,editSolution);



module.exports = router;
