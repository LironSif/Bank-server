import mongoose from "mongoose";
import STATUS_CODE from "../constants/statusCodes.js";
import Account from "../model/accountModel.js";
import User from "../model/userModel.js";

// Controller to get all accounts
export const getAllAccounts = async (req, res, next) => {
  try {
    const accounts = await Account.find({}).populate("owner");
    res.status(STATUS_CODE.OK);
    res.send(accounts);
  } catch (error) {
    next(error);
  }
};

// Controller to get single accounts....................................................
export const getAccountsByUserId = async (req, res, next) => {
  try {
    const userId = req.params.id;
    console.log("Received user ID:", userId);
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(STATUS_CODE.BAD_REQUEST).send("Invalid user ID.");
    }

    const accounts = await Account.find({ owner: userId }).populate("owner");
    if (!accounts.length) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .send("No accounts found for this user.");
    }

    res.status(STATUS_CODE.OK).send(accounts);
  } catch (error) {
    next(error);
  }
};

// Controller to create account.................................................................
export const createAccount = async (req, res, next) => {
  try {
    const userId = req.params.id;
    let { cash } = req.body; // cash is now only for the checking account

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(STATUS_CODE.BAD_REQUEST).send("Invalid user ID.");
    }

    // Check if the user already has accounts
    const existingAccounts = await Account.find({ owner: userId });
    if (existingAccounts.length > 0) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .send("Sorry, one account per user.");
    }

    // Convert cash to a number and validate
    cash = Number(cash);
    if (isNaN(cash) || cash < 0) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .send("Invalid cash value. Must be a non-negative number.");
    }

    // Create checking account
    const checkingAccount = await Account.create({
      owner: userId,
      cash,
      accountType: "checking",
    });

    // Create savings account with zero initial cash
    const savingsAccount = await Account.create({
      owner: userId,
      cash: 0,
      accountType: "savings",
    });

    res.status(STATUS_CODE.CREATED).send({ checkingAccount, savingsAccount });
  } catch (error) {
    next(error);
  }
};

// Controller to delete account..................................................
export const deleteAccount = async (req, res, next) => {
  try {
    const userId = req.params.id;

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(STATUS_CODE.BAD_REQUEST).send("Invalid user ID.");
    }

    // Check if the user has accounts
    const accounts = await Account.find({ owner: userId });
    if (accounts.length === 0) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .send("No accounts found for the user.");
    }

    // Delete all accounts associated with the user
    await Account.deleteMany({ owner: userId });

    res
      .status(STATUS_CODE.OK)
      .send("All accounts deleted successfully for the user.");
  } catch (error) {
    next(error);
  }
};

export const userDeposit = async (req, res, next) => {
  try {
    const userId = req.params.id;
    let { amount } = req.body;

    amount = Number(amount);
    if (isNaN(amount) || amount <= 0) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .send("Invalid deposit amount. Must be a positive number.");
    }

    const checkingAccount = await Account.findOne({
      owner: userId,
      accountType: "checking",
    });
    if (!checkingAccount) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .send("Checking account not found.");
    }

    checkingAccount.cash += amount;
    await checkingAccount.save();

    res.status(STATUS_CODE.OK).send(checkingAccount);
  } catch (error) {
    next(error);
  }
};

export const userWithdraw = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { amount } = req.body;


    const checkingAccount = await Account.findOne({
      owner: userId,
      accountType: "checking",
    });
    if (!checkingAccount) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .send("Checking account not found.");
    }

    if (checkingAccount.cash < amount) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .send("Insufficient funds for the withdrawal.");
    }

    checkingAccount.cash -= amount;
    await checkingAccount.save();

    res.status(STATUS_CODE.OK).send(checkingAccount);
  } catch (error) {
    next(error);
  }
};

export const userTransfer = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const { fromAccountId, toAccountId, amount } = req.body;

    console.log("userid:", userId);
    console.log("data from frontend - from account", fromAccountId);
    console.log("data from frontend - to account", toAccountId);
    console.log("data from frontend - amount", amount);

    // Validate userId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(STATUS_CODE.BAD_REQUEST).send("Invalid user ID.");
    }

    // Convert amount to a number and validate
    const transferAmount = Number(amount);
    if (isNaN(transferAmount) || transferAmount <= 0) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .send("Invalid transfer amount. Must be a positive number.");
    }

    // Find 'from' and 'to' accounts by their IDs
    const fromAccount = await Account.findById(fromAccountId);
    const validatorfrom = fromAccount
    const toAccount = await Account.findById(toAccountId);
    const validatorfrom2 = toAccount

    if (!fromAccount || !toAccount) {
      return res
        .status(STATUS_CODE.NOT_FOUND)
        .send("One or both accounts not found.");
    }

    if (fromAccount.cash < transferAmount) {
      return res
        .status(STATUS_CODE.BAD_REQUEST)
        .send(`Insufficient funds in the from account.`);
    }

    // Perform the transfer operation
    fromAccount.cash -= transferAmount;
    toAccount.cash += transferAmount;

    await fromAccount.save();
    await toAccount.save();

    res.status(STATUS_CODE.OK).send({
      message: "Transfer completed successfully",
      fromAccount: fromAccount,
      toAccount: toAccount,
      check: validatorfrom,
      check2: validatorfrom2,
    });
  } catch (error) {
    next(error);
  }
};

