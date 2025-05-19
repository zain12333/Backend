// import { verify } from "jsonwebtoken";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    verifyotp: { type: String, default: '' },
    verifyotpExpireAt: { type: Number, default: 0 },
    isAccountverified: { type: Boolean, default: false },
    resetotp: { type: String, default: '' },
    resetotpExpireAt: { type: Number, default: 0 },
})

const userModel =  mongoose.model('user', userSchema);

export default userModel;