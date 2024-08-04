const mongoose = require("mongoose");

const postsModel = mongoose.Schema(
  {
    posterId: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxLength: 500,
    },
    articleId: {
      type: [String],
      required: true,
    },
    likes: {
      type: [String],
    },
    dislikes: {
      type: [String],
    },
    vues: {
      type: [String],
    },
    partages: {
      type: [String],
    },
    comments: {
      type: [
        {
          commenterId: String,
          commenterPseudo: String,
          text: String,
          timestamps: Number,
        },
      ],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PostsModel = mongoose.model('posts', postsModel);

module.exports = PostsModel
