const UsersModel = require("../Models/usersModel");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60 * 100;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, {
    expiresIn: maxAge,
  });
};

// REGISTER:
module.exports.signUp = async (req, res) => {
  const { pseudo, email, password, profil } = req.body;

  try {
    const newUser = await UsersModel.create({
      pseudo,
      email,
      password,
      profil,
    });
    res.status(200).json({ user: newUser.email });
  } catch (err) {
    res.status(400).json({ message: "Register error: " + err });
  }
};

// LOGIN:
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UsersModel.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge });
    // console.log(token);
    res.status(200).json({ message: `Authentification réussie: ${user._id}` });
  } catch (err) {
    res.status(400).json({ message: "Login Error " + err });
  }
};

// LOGOUT:
module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/api/posts");
};
