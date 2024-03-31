const User = require("../models/User");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const blacklist = new Set();

// Express Auth Registration Function
const register = async (req, res) => {
  try {
    const { email, username, firstname, lastname, password } = req.body;
    // Check if username already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.send({ data: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = new User({
        email,
        username,
        firstname,
        lastname,
        password: hashedPassword,
      });
      await newUser.save();

      res.status(201).json({ message: "User created successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Express Auth Login Function
async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.send({ data: "Invalid username or password" });
    }
    // Compare the provided password with the hashed password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.send({ data: "Invalid username or password" });
    }
    // If passwords match, create a JWT token
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET);
    res.send({
      status: "ok",
      token: token,
      email: user.email,
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      user_id: user._id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}

// Express Auth Logout Function
async function logout(req, res) {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    blacklist.add(token);
    res.send({ message: "Logged out successfully" });
  } else {
    res.status(400).json({ message: "Invalid token" });
  }
}

module.exports = { register, login, logout };
