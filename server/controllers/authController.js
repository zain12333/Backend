import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
// this is for registering the user
export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.json({ success: false, message: 'Missing Details' });
    }

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.json({ success: false, message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new userModel({ name, email, password: hashedPassword });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.json({ 
            success: true,
            message: "Register successfully",
            user: { name: user.name, email: user.email }
         });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};
// this is for login the user
export const login = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body;

    if (!email || !password) {
        return res.json({ success: false, message: 'Email and password are required' });
    }

    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        // Sending welcome email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: `Welcome to Invextech`,
            text: `Welcome to Invextech website. Your account is created with email ID: ${email}`,
        };

        await transporter.sendMail(mailOptions);

        return res.json({
            success: true,
            message: "Logged in successfully",
            user: { name: user.name, email: user.email }
        });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
  
// this is logout the user details
export const logout = async (req, res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        });

        return res.json({ success: true, message: "Logged Out" });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};
// this is for sending the otp to the user email
export const sendVerifyotp = async (req, res) => {
    try {
        // Only use email from req.body, ignore other fields
        const { email } = req.body;
        if (!email) {
            return res.json({ success: false, message: 'Email is required' });
        }
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }
        if (user.isAccountverified) {
            return res.json({ success: false, message: 'Account already verified' });
        }
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.verifyotp = otp;
        user.verifyotpExpireAt = Date.now() + 5 * 60 * 1000; // 5 minutes
        await user.save();
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Verify your account OTP',
            text: `Your verification OTP is ${otp}.`,
        };
        await transporter.sendMail(mailOptions);
        res.json({ success: true, message: 'Verification OTP sent to your email' });
    } catch (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
    }
};
// this is for verifying the otp
export const verifyEmail = async (req, res) => {
    const { userid, otp } = req.body;

    if (!userid || !otp) {
        return res.json({ success: false, message: 'Missing details' });
    }

    try {
        const user = await userModel.findById(userid);

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (user.verifyotp === '' || user.verifyotp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        if (user.verifyotpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP expired' });
        }

        user.isAccountverified = true;
        user.verifyotp = '';
        user.verifyotpExpireAt = 0;
        await user.save();

        return res.json({ success: true, message: 'Account verified successfully' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
};

// this is used for  user in already login or not 
export const isAuthenticated = async (req, res) => {

    try {
        return res.json({ success: true, message: 'User is authenticated' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//send reset password otp
export const sendResetOtp = async (req, res) => {

    const { email } = req.body;

    if (!email) {
        return res.json({ success: false, message: 'Email is required' });
    }
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        const otp = String(Math.floor(100000 + Math.random() * 900000));

        user.resetotp = otp;
        user.resetotpExpireAt = Date.now() + 15 * 60 * 1000; // 5 minutes
        await user.save();

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password reset OTP',
            text: `Your OTP for resetting your password is ${otp}. 
            Use this OTP to reset your password.`,
        };

        await transporter.sendMail(mailOptions);

        return res.json({ success: true, message: 'Reset OTP sent to your email' });

    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}

//Reset User  password 
export const resetPassword = async (req, res) => {
    const { email, otp, newpassword } = req.body;

    if (!email || !otp || !newpassword) {
        return res.json({ success: false, message: 'Email, OTP, and New Password are required' });
    }

    try {
        const user = await userModel.findOne({ email }); // FIXED HERE

        if (!user) {
            return res.json({ success: false, message: 'User not found' });
        }

        if (user.resetotp === '' || user.resetotp !== otp) {
            return res.json({ success: false, message: 'Invalid OTP' });
        }

        if (user.resetotpExpireAt < Date.now()) {
            return res.json({ success: false, message: 'OTP expired' });
        }

        const hashedPassword = await bcrypt.hash(newpassword, 10);
        user.password = hashedPassword;
        user.resetotp = '';
        user.resetotpExpireAt = 0;
        await user.save();

        return res.json({ success: true, message: 'Password has been reset successfully' });
    } catch (error) {
        return res.json({ success: false, message: error.message });
    }
}







