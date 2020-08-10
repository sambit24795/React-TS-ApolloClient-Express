const jwt = require("jsonwebtoken");

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
