import User from "../model/userModel.js"
import STATUS_CODE from '../constants/statusCodes.js'

// Controller to get all users
export const getAllUsers = async (req,res,next) => {
    try {
        const users =await User.find().populate('accounts');

        res.send(users)
    } catch (error) {
        next(error)
    }
}

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
export const getUserById = async (req,res,next) => {
    try {
        const user = await User.findById(req.params.id).populate('accounts')
        if(!user){
            res.status(STATUS_CODE.NOT_FOUND)
            throw new Error("no such user in the DB")
        }
        res.send(user)
    } catch (error) {
        next(error)
    }
}

// Controller to create  user
export const createUser = async (req,res,next) => {
    try {
        const {name, email} = req.body
        const newUser = await User.create({name, email})
        res.status(STATUS_CODE.CREATED).send(newUser)
    } catch (error) {
        next(error)
    }
}