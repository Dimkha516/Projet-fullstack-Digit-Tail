const ArticleModel = require("../Models/articlesModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// GET ALL ARTICLES:
module.exports.getAllArticles = async (req, res) => {
  const allArticles = await ArticleModel.find();
  allArticles
    ? res.status(200).json({ allArticles })
    : res.status(400).json({ message: "Aucun article trouvé !" });
};

// GET ONE ARTICLE:
module.exports.getOneArticle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: "Id article introuvable !" });
  }
  const searchedArticle = await ArticleModel.findById(req.params.id);
  searchedArticle
    ? res.status(200).json({ searchedArticle })
    : res.status(400).json({ message: "Aucun article trouvé" });
};

// ADD ARTICLE:
module.exports.addArticle = async (req, res) => {
  const { libelle, photo, prix, stock } = req.body;
  try {
    const newArticle = await ArticleModel.create({ libelle, photo, prix, stock });
    res.status(201).json({ newArticle });
  } catch (err) {
    res.status(400).json({ message: "Erreur création article " + err });
  }
};



