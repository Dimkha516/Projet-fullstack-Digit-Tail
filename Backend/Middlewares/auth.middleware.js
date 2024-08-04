const jwt = require("jsonwebtoken");
const UsersModel = require("../Models/usersModel");

// MIDDLEWARE:
module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookies("jwt", "", { maxAge: 1 });
        // console.log("Token invalid");
        next();
      } else {
        let user = await UsersModel.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }  
    })
  } else {
    res.locals.user = null;
    next();
  }
};

// 
module.exports.requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, async(err, decodedToken) => {
            if(err){
                console.log("Token invalid ou expiré");
            } else{
                console.log(decodedToken);
                next();
            }
        })
    } else{
        console.log("No token");
    }
}

