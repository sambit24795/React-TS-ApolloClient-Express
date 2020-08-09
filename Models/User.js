const mongoose = require("mongoose");

const { Schema } = mongoose;

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },

  joinDate: {
    type: Date,
    default: Date.now(),
  },

  favorites: {
    type: [Schema.Types.ObjectId],
    ref: "Recipe",
  },
});

module.exports = mongoose.model("User", UserSchema);
