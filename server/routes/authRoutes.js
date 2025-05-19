import express from 'express'
import { login, logout, register, sendVerifyotp, verifyEmail, isAuthenticated, resetPassword, sendResetOtp } from '../controllers/authController.js';

import userAuth from '../middleware/userauth.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout',logout);
authRouter.post('/send-Verify-otp',userAuth, sendVerifyotp);
authRouter.post('/verify-account',userAuth, verifyEmail);
authRouter.get('/is-auth',userAuth, isAuthenticated); 
authRouter.post('/send-reset-otp',userAuth, sendResetOtp); 
authRouter.post('/reset-otp',userAuth, resetPassword); 





export default  authRouter;