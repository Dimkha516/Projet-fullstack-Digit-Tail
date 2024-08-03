const UsersModel = require("../Models/usersModel");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

// GET ALL USERS:
module.exports.getAllUsers = async (req, res) => {
  const allUsers = await UsersModel.find().select("-password");
  allUsers
    ? res.status(200).json({ message: allUsers })
    : res.status(400).json({ message: "Aucun utilisateur trouvé" });
};

// GET USER BY ID:
module.exports.getOneUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(200).json({ message: "Utilisateur non trouvé" });
  }
  const searchedUser = await UsersModel.findById(req.params.id);
  res.status(200).json({ message: searchedUser });
};

// UPDATE USER PICTURE:
module.exports.updateUserPicture = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(200).json({ message: "Utilisateur non trouvé" });
  }

  try {
    await UsersModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          picture: req.body.picture,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    res.status(200).json({ message: "Photo profil mis à jour avec succès !" });
  } catch (err) {
    res.status(400).json({ message: "Error updating user picture" });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(200).json({ message: "Utilisateur non trouvé" });
  }

  await UsersModel.deleteOne({ _id: req.params.id }).exec();
  res
    .status(200)
    .json({ message: "Utilisateur supprimé de la base de données" });
};


// FOLLOW:
module.exports.follow = async(req, res) => {
  if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.follower)) {
    return res.status(200).json({ message: "Follower non trouvé" });
  }
  try{
    await UsersModel.findByIdAndUpdate(
      req.params.id,
      {$addToSet: {followers: req.body.follower}},
      {new: true, upsert: true}
    );
    await UsersModel.findByIdAndUpdate(
      req.body.follower,
      {$addToSet: {followings: req.params.id}},
      {new: true, upsert: true}
    );
    res.status(200).json({message: "Follower mis à jour !"})
  }
  catch(err){
    res.status(400).json({message: "Erreur Following " + err});
  }
}

// UNFOLLOW:
module.exports.unfollow = async(req, res) => {
  if (!ObjectId.isValid(req.params.id) || !ObjectId.isValid(req.body.unfollower)) {
    return res.status(200).json({ message: "Follower non trouvé" });
  }
  try{
    await UsersModel.findByIdAndUpdate(
      req.params.id,
      {$pull: {followers: req.body.unfollower}},
      {new: true, upsert: true}
    );
    await UsersModel.findByIdAndUpdate(
      req.body.unfollower,
      {$pull: {followings: req.params.id}},
      {new: true, upsert: true}
    );
    res.status(200).json({message: "Follower mis à jour !"})
  }
  catch(err){
    res.status(400).json({message: "Erreur Following " + err});
  }
}

// LIKE POST:

// DISLIKE POST:

