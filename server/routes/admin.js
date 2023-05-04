const express = require("express");
const router  = express.Router();

const {addQuestion}  = require("./../controllers/admin/questionController");

router.route("/question/add").post(addQuestion)

module.exports = router;