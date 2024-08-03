const express = require("express");
const ConnectToDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const usersRoutes = require("./Routes/usersRoutes");

// CONNEXION AU CLOUD:
ConnectToDB();

// MIDDLEWARES:
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// ROUTES:
app.use('/api/users', usersRoutes); 

// LANCEMENT DU SERVER:
app.listen(port, () => {
  console.log(`Running on port : ${port}`);
}); 
 

// AJOUT DE LIKES, FAVORIS ET POSTS POUR UN UTILISATEUR EN ATTENTE DE CREATION DES POSTS 