const express = require("express");
const router  = express.Router();
const isAdminUserSuperUserLoggedIn =require("./../middlewares/isAdminUserSuperUser");
const { postBlog, getAllBlog, likeBlog, deleteBlog, getBlogById } = require("../controllers/blog");
const isAdminLoggedIn = require("../middlewares/isAdminLoggedIn");

router.route("/add").post(isAdminUserSuperUserLoggedIn ,postBlog );
router.route("/AllBlog").get(isAdminUserSuperUserLoggedIn ,getAllBlog );
router.route("/:id").get(isAdminUserSuperUserLoggedIn ,getBlogById );

router.route("/:id/like").put(isAdminUserSuperUserLoggedIn ,likeBlog );
router.route("/delete").delete(isAdminLoggedIn ,deleteBlog );




module.exports = router;
