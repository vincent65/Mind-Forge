import { NextFunction , Request, Response} from "express";
import User from "../models/User.js";
import { hash, compare } from 'bcrypt';
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

export const getAllUsers = async (req:Request, res:Response, next: NextFunction) => {
    //get all users directly from the database
    try{
        const users = await User.find();
        return res.status(200).json({message: "OK", users});
    }
    catch(error) {
        console.log(error);
        return res.status(200).json({message: "Error", cause: error.message});
    }
};

export const userSignUp = async (req:Request, res:Response, next: NextFunction) => {
    //user signup
    try{
        const { name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(401).send("User already registered");

        //encrypt password
        const hashedPassword = await hash(password, 10);
        
        const user = new User({
            name, email, password: hashedPassword
        });
        await user.save();

        //create token and store cookie
        res.clearCookie(COOKIE_NAME, {httpOnly: true, domain: "localhost", signed: true, path: "/", sameSite: 'none', partitioned: true, secure: true});

        //create jwt token
        const token = createToken(user._id.toString(), user.email, "7d");
        //send token in form of cookies; from backend to frontend using cookie parser
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {path: "/", domain: "localhost", expires, httpOnly: true, signed: true, sameSite: 'none', partitioned: true, secure: true});



        return res.status(201).json({message: "OK",  name: user.name, email:user.email});
    }
    catch(error) {
        console.log(error);
        return res.status(200).json({message: "Error", cause: error.message});
    }
};


export const userLogin = async (req: Request, res: Response, next: NextFunction) => {
    //user login
    try{
        const {email, password} = req.body;
        //verify user exists
        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).send("User not registered");
        }

        //check that password is correct
        const isPasswordCorrect = await compare(password, user.password);
        if(!isPasswordCorrect) {
            return res.status(403).send("Incorrect Password");
        }

        res.clearCookie(COOKIE_NAME, {httpOnly: true, domain: "localhost", signed: true, path: "/", sameSite: 'none', partitioned: true, secure: true});

        //create jwt token
        const token = createToken(user._id.toString(), user.email, "7d");
        //send token in form of cookies; from backend to frontend using cookie parser
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {path: "/", domain: "localhost", expires, httpOnly: true, signed: true, sameSite: 'none', partitioned: true, secure: true});


        return res.status(200).json({message: "OK", name: user.name, email:user.email});
    }
    catch(error) {
        console.log(error);
        return res.status(200).json({message: "Error", cause: error.message});
    }
};

export const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    //user login
    try{
       
        const user = await User.findById({email: res.locals.jwtData.id});
        if(!user) {
            return res.status(401).send("User not registered for token or token malfunctioned");
        }
        console.log(user._id.toString(), res.locals.jwtData.id);

        if(user._id.toString() === res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }

        return res.status(200).json({message: "OK", name: user.name, email:user.email});
    }
    catch(error) {
        console.log(error);
        return res.status(200).json({message: "Error", cause: error.message});
    }
};

export const userLogout = async (req: Request, res: Response, next: NextFunction) => {
    //user login
    try{
       
        const user = await User.findById({email: res.locals.jwtData.id});
        if(!user) {
            return res.status(401).send("User not registered for token or token malfunctioned");
        }
        console.log(user._id.toString(), res.locals.jwtData.id);
        
        if(user._id.toString() === res.locals.jwtData.id) {
            return res.status(401).send("Permissions didn't match");
        }
         res.clearCookie(COOKIE_NAME, {httpOnly: true, domain: "localhost", signed: true, path: "/", sameSite: 'none', partitioned: true, secure: true});
        return res.status(200).json({message: "OK", name: user.name, email:user.email});
    }
    catch(error) {
        console.log(error);
        return res.status(200).json({message: "Error", cause: error.message});
    }
};