const express = require("express");
const {
  getAllArticles,
  getOneArticle,
  addArticle,
} = require("../Controllers/articlesControllers");
const router = express.Router();

router.get("/", getAllArticles);
router.get("/:id", getOneArticle);

router.post("/", addArticle);



module.exports = router;
