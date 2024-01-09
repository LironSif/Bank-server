import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  cash: {
    type: Number,
    required: true,
    default: 0 // Default cash balance
  },
  accountType: {
    type: String,
    enum: ['savings', 'checking'],
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

});

const Account = mongoose.model("Account", accountSchema);
export default Account;
