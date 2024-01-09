import User from "../model/userModel.js";
import STATUS_CODE from "../constants/statusCodes.js";
import bcrypt, { hash } from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

// expermantal................................

// @desc   Register new user
// @route  POST//api/v1/users/s
// @access Public
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(STATUS_CODE.BAD_REQUEST);
    throw new Error("please add all fields");
  }

  // check if user exist
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(STATUS_CODE.BAD_REQUEST);
    throw new Error("User allready exist");
  }

  // hash passeword
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(STATUS_CODE.CREATED).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(STATUS_CODE.BAD_REQUEST);
    throw new Error("invalid user data");
  }
};

// @desc   Authenticate a user
// @route  POST/api/v1/users/login
// @access Public
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // check for user email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(STATUS_CODE.BAD_REQUEST);
    throw new Error("invalid credentials");
  }
};

// @desc   Get user data
// @route  GET/api/v1/users/me
// @access privte
export const getMe = async (req, res) => {
  const { _id, name, email } = await User.findById(req.user.id);
  res.status(STATUS_CODE.OK);
  res.json({ id: _id, name, email, });
};

//   generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// expermantal................................

// Controller to get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().populate("accounts");

    res.send({ users });
  } catch (error) {
    next(error);
  }
};

export const getUserByEmail = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Controller to get single user
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate("accounts");
    if (!user) {
      res.status(STATUS_CODE.NOT_FOUND);
      throw new Error("no such user in the DB");
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
};

// Controller to create  user
export const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const newUser = await User.create({ name, email });
    res.status(STATUS_CODE.CREATED).send(newUser);
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    const deleteResult = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted", deleteResult });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "An error occurred", error: error.message });
  }
};
