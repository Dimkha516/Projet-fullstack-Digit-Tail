const mongoose = require("mongoose");

const articleModel = mongoose.Schema(
  {
    libelle: {
      type: String,
      required: true,
    },
    photo: {
        type: String,
        required: true
    },
    prix: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
    postes: {
      type: [String],
    },
    partages: {
      type: [String],
    },
    likes: {
      type: [String],
    },
    notes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);


const ArticleModel = mongoose.model("articles", articleModel);
module.exports = ArticleModel;