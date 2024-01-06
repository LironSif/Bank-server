import express from "express";
import { getUserByEmail,getAllUsers, getUserById, createUser} from "../controllers/userController.js";

const router = express.Router()

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.get('/email/:email', getUserByEmail);

export default router