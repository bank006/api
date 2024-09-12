import dotenv from "dotenv"

dotenv.config()

export const sendToken = (token , user , statusCode, res) => {
    const options = {
        expires: new Date(Date.now()+ 24 * 60 * 60 * 1000),
        httpOnly: true,
        sameSite: 'None',
        secure: true,
    };


    res.status(statusCode).cookie("auth_token" , token , options).json({
        success: true,
        user,
        token
    });
};