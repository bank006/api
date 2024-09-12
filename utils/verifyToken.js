import jwt from "jsonwebtoken";
import {createError} from "./error.js";
import dotenv  from "dotenv";

dotenv.config();


export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 
    
    console.log(token);
    if (!token) {
        return res.status(401).json({ message: 'Token is required' });
    }

    if (token !== process.env.API_TOKEN) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      next();
};


export const verifyUser = (req, res, next) => {
    verifyToken(req, res, (err) => {
        if (err) {
            return next(createError(403, "You are not an authorized client"));
        }

        if (req.user && req.user.id) {
            next(); // User is authorized, proceed to the next middleware or route handler
        } else {
            return next(createError(403, "You are not an authorized client"));
        }
    });
};

