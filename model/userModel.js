import mongoose from 'mongoose';
import Account from './accountModel.js';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide a Name"],
  },
  email: {
    type: String,
    required: [true, "must provide Email"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please add a valid email"],
  },
  password: {
    type: String,
    required: [true, "must provide password"],
  },
  accounts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  }],
}, {
  timestamps: true 
});

const User = mongoose.model("User", userSchema);
export default User;
