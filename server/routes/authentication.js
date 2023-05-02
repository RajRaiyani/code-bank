const express = require("express");
const router  = express.Router();

const { SignIn, LogIn, AdminLogIn } = require("../controllers/authenticationController");


router.route("/SignIn").post(SignIn);
router.route("/LogIn").post(LogIn);
router.route("/AdminLogIn").post(AdminLogIn);

module.exports = router;