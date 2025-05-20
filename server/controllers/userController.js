import userModel from "../models/userModel.js";


export const getUserData = async (req, res) => {
try {
    const {userid} = await req.body;

    const user = await userModel.findById(userid);

    if (!user) {
        return res.json({ success: false, message: 'User not found' });
    }

    res.json({
         success: true,
         userData:{
            name: user.name,
            email: user.email, // ensure email is included
            isAccountverified: user.isAccountverified,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt

    } });



}catch (error) {
    return res.json({ success: false, message: error.message });
}
}
