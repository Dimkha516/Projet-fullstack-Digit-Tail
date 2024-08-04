const express = require("express");
const { addPost, getAllPosts } = require("../Controllers/postsControllers");

const router = express.Router();

router.get("/", getAllPosts);
router.post("/", addPost);

module.exports = router;
