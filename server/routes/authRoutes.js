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
authRouter.post('/send-reset-otp', sendResetOtp); 
authRouter.post('/reset-password', resetPassword); 





export default  authRouter;