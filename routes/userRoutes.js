import express from "express";
import {getMe ,loginUser, registerUser, deleteUserById, getUserByEmail,getAllUsers, getUserById, createUser} from "../controllers/userController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUserById)
// router.post('/', createUser)
// expermantal................................

router.post('/', registerUser)
router.post('/login', loginUser)
router.get('/s/me',protect, getMe);

// expermantal................................

router.get('/email/:email', getUserByEmail);
router.delete('/:id', deleteUserById)

export default router