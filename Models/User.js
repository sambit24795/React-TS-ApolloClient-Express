const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    unique: true,
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

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(12, (err, salt) => {
    if (err) {
      return next();
    }
    bcrypt.hash(this.password, salt, (err, hash) => {
      if (err) {
        return next();
      }
      this.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model("User", UserSchema);
