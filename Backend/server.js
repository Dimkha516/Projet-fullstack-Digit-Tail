const express = require("express");
const app = express();
const ConnectToDB = require("./config/database");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const usersRoutes = require("./Routes/usersRoutes");
const articlesRoutes = require("./Routes/articlesRoutes");
const postsRoutes = require("./Routes/postsRoutes");
const { checkUser, requireAuth } = require("./Middlewares/auth.middleware");

// CONNEXION AU CLOUD:
ConnectToDB();

// MIDDLEWARES:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
 
// JWT:
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});
 
// ROUTES:
app.use("/api/users", usersRoutes);
app.use("/api/articles", articlesRoutes);
app.use("/api/posts", postsRoutes);

// LANCEMENT DU SERVER:
app.listen(port, () => {
  console.log(`Running on port : ${port}`);
});

// AJOUT DE LIKES, FAVORIS ET POSTS POUR UN UTILISATEUR EN ATTENTE DE CREATION DES POSTS
 