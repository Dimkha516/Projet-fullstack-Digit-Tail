const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcryptjs = require("bcryptjs");

const usersModel = mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
      unique: true,
      minLength: 3,
      mawLength: 16,
      trim: true,
    },

    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: [isEmail],
    },

    password: {
      type: String,
      required: true,
      minLength: 6,
      maxLength: 64,
    },
    profil: {
      type: String,
      enum: ["vendeur", "visiteur"],
      required: true,
    },
    picture: {
      type: String,
      default: "./uploads/profil/random.jpg",
    },
    followers: {
      type: [String],
    },
    followings: {
      type: [String],
    },
    posts: {
      type: [String],
    },
    favoris: {
      type: [String],
    },
    likes: {
      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

// CRYPTAGE DU PASSWORD À L'INSCRIPTION:
usersModel.pre("save", async function (next) {
  const salt = await bcryptjs.genSalt();
  this.password = await bcryptjs.hash(this.password, salt);
  next();
});

// DECRYPTAGE AU LOGIN:
usersModel.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const auth = await bcryptjs.compare(password, user.password);

    if (auth) {
      return user;
    }
    throw Error("Email ou mot de passe incorrect");
  }
  throw Error("Email ou mot de pass incorrect");
};

const UsersModel = mongoose.model("users", usersModel);
module.exports = UsersModel;
