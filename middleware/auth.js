import jwt from 'jsonwebtoken';
import Users from '../models/userModels.js'; 
import { createError } from '../utils/error.js';


export const isAuthenticated = async(req,res,next) => {
    const auth_token = req.cookies.auth_token;
    console.log(auth_token);
    try{
    if(!auth_token){
        return next(createError(401,"Please login to continue"));
    }
    const decoded = jwt.verify(auth_token, process.env.JWT);
    req.user = await Users.findById(decoded.id);
    next();
   }catch(err){
    console.log(err);
     res.status(500).json({status:false , message:"isAuthenticated is Required"})
     next();
   }
};
