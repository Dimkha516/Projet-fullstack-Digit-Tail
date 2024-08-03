const express = require("express");
const { signUp, signIn, logout } = require("../Controllers/authControllers");
const {
  getAllUsers,
  getOneUser,
  updateUserPicture,
  deleteUser,
  follow,
  unfollow,
} = require("../Controllers/usersControllers");
const router = express.Router();

// AUTHENTIFICATIONS:
router.post("/register", signUp);
router.post("/login", signIn);
router.get("/logout", logout);

//
router.get("/", getAllUsers);
router.get("/:id", getOneUser);
router.delete("/:id", deleteUser);
router.patch("/updatePhoto/:id", updateUserPicture);
router.patch("/follow/:id", follow);
router.patch("/unfollow/:id", unfollow);

module.exports = router;
