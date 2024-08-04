const express = require('express');
const { addPost } = require('../Controllers/postsControllers');

const router = express.Router();


router.post("/", addPost);


module.exports = router;
