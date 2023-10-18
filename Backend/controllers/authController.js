const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// CREATING A USER LOGIC
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  // const { image } = req.file.filename
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newuser = new User({
      name,
      email,
      password: hash,
      profile: req.file.filename,
    });
    const user = await newuser.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// LOGIN A USER LOGIC
const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // checking if user exist
    if (!user) {
      throw Error("Incorrect Email");
    }
    // comparing the passwords
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      throw Error("Incorrect password");
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    res.status(200).json({token});
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

module.exports = { createUser, login };
