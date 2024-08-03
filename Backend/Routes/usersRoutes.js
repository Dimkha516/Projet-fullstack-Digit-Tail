const express = require("express");
const { signUp, signIn, logout } = require("../Controllers/authControllers");
const router = express.Router();

// AUTHENTIFICATIONS:
router.post("/register", signUp);
router.post("/login", signIn);
router.get("/logout", logout);

module.exports = router;
