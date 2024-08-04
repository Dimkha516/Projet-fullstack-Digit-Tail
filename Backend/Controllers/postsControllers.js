const UsersModel = require("../Models/usersModel");
const ArticleModel = require("../Models/articlesModel");
const PostsModel = require("../Models/postsModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// GET ALL POSTS:
module.exports.getAllPosts = async (req, res) => {
  const allPosts = await PostsModel.find();
  allPosts
    ? res.status(200).json({ allPosts })
    : res.status(400).json({ message: "Aucun post trouvé" });
};
// GET ONE POST:

// CREATE POST:
module.exports.addPost = async (req, res) => {
  if (
    !ObjectId.isValid(req.body.posterId) ||
    !ObjectId.isValid(req.body.articleId)
  ) {
    return res.status(400).json({ message: "Erreur d'entrées post !" });
  }

  const { posterId, description, articleId } = req.body;
  try {
    const newPost = await PostsModel.create({
      posterId,
      description,
      articleId,
    });
    const posterUser = await UsersModel.findByIdAndUpdate(
      req.body.posterId,
      { $addToSet: { posts: newPost.id } },
      { new: true, upsert: true }
    );
    const postedArticle = await ArticleModel.findByIdAndUpdate(
      req.body.articleId,
      { $addToSet: { postes: newPost.id } },
      { new: true, upsert: true }
    );

    res.status(201).json({ newPost });
  } catch (err) {
    res.status(400).json({ message: "Erreur d'ajout de post " + err });
  }
};

// LIKE POST:

// DISLIKE POST:

// VIEW POST:

// SHARE POST:

// COMMENT POST:
