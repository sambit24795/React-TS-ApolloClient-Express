const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const User = require("../Models/User");

const createToken = ({ userName, email }) => {
  return jwt.sign({ userName, email }, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
};

exports.signupUser = async ({ userName, email, password }) => {
  const user = await User.findOne({ userName, email });

  if (user) {
    throw new Error("User already exists!");
  }

  try {
    const newUser = await new User({
      userName,
      email,
      password,
    }).save();
    return newUser && createToken({ userName, email });
  } catch (err) {
    console.error(err);
  }
};

exports.signinUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found!");
  }

  const doMatch = await bcrypt.compare(password, user.password);

  if (!doMatch) {
    throw new Error("Invalid Password");
  }

  return createToken(user);
};

exports.getCurrentUser = async ({ userName, email }) => {
  return await User.findOne({ userName, email }).populate({
    path: "favorites",
    model: "Recipe",
  });
};
