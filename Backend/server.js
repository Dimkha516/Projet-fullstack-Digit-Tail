const express = require("express");
const ConnectToDB = require("./config/database");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;


// CONNEXION AU CLOUD:
ConnectToDB();

// MIDDLEWARES:

// ROUTES:

// LANCEMENT DU SERVER:
app.listen(port, () => {
 console.log(`Running on port : ${port}`);
});
