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
  accounts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  }]
  // Additional user fields as needed
});

const User = mongoose.model("User", userSchema);
export default User;
