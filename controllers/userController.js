import Users from "../models/userModels.js"
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"
import { createError } from "../utils/error.js";
import { sendToken } from "../utils/sendToken.js";
dotenv.config();

export const register = async (req, res, next) => {
  const { username, email, password, phone, address, location, Fileimg, role} = req.body;

  try {
    const existUser = await Users.findOne({ email, username});
    if (existUser)
      return res.status(403).json({
        success: false,
        message: "This Book name already exists.",
    });

    // Check if user already exists
    const oldMember = await Users.findOne({ where : { email } });
    if (oldMember) {
      return res.status(409).send("User already exist. Please login");
    }

    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);
      console.log(encryptedPassword);  
    let newUser;
    if (role === "member") {
      newUser = await Users.create({
        username,
        email,
        password: encryptedPassword,
        phone,
        role
      });

    } else if (role === "barber") {
      newUser = await Users.create({
        username,
        email,
        password: encryptedPassword,
        phone,
        address,
        location,
        img:Fileimg,
        role
      });

    } else if (role === "mbarber") {
      newUser = await Users.create({
        username,
        email,
        password: encryptedPassword,
        phone,
        location,
        img:Fileimg,
        role
      });
    }
    // Optionally save token to newUser
    await newUser.save();

    // Return new user with status
    res.status(201).json({ newUser, status: "OK"});

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error creating user"});
  }
}

export const login = async (req, res, next) => {
 

  try {
    const { email, password } = req.body;
    const member = await Users.findOne({ email }).select("+password");
    if (!member) {
      res.status(400).json({
        status: "error",
        message: "This user was not found. Please try again",
      });
      return next(
        createError(400, "This user was not found. Please try again!")
      );
    }

    const isPass = await bcrypt.compare(password, member.password);
    if (!isPass) {
      return res.status(400).json({
        status: false,
        message: "Wrong password or username!",
      });
    }

    const token = jwt.sign({ id: member._id, role: member.role }, process.env.JWT, {
      expiresIn: "1d",
    });
    let memberData = member;
    sendToken(token, memberData, 200, res);
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Error in login function!",
    });
    console.log(error);
    return next(createError(500, "Error in login function"));
  }
};

export const logout = async (req, res, next) => {
  try {
    res.cookie("auth_token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });
    res.status(201).json({
      success: true,
      message: "Log out successful!",
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await Users.findById(req.user.id);
      
    if (!user) {
      return next("User doesn't exists", 400);
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(createError(500, error.message));
  }
};

export const get_alluser = async (req, res)=>{
  try {
    const users = await Users.find()
    res.status(200).json({
      success: true,
      users
    })
  }catch(error){
    return next(createError(500, error.message))
  }
}