import express from "express";
import {
  userWithdraw,
  userTransfer,
  getAllAccounts,
  getAccountsByUserId,
  createAccount,
  deleteAccount,
  userDeposit,
} from "../controllers/accountContriller.js";

const router = express.Router();

router.get("/", getAllAccounts);
router.get("/:id", getAccountsByUserId);
router.post("/:id", createAccount);
router.delete("/:id", deleteAccount);
router.post("/:id/deposit", userDeposit);
router.post("/:id/Withdraw", userWithdraw);
router.post("/:id/transfer", userTransfer);
router.post("/:id/transfer", userTransfer);

export default router;
