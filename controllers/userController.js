const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET_KEY, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(User._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ hata: error.message });
  }
};

const registerUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.register(email, password);

    const token = createToken(User._id);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ hata: error.message });
  }
};

module.exports = {
  loginUser,
  registerUser,
};
