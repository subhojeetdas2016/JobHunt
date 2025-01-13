import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import multer from "multer";
import getDataUri from '../utils/datauri.js'; 
import cloudinary from '../utils/cloudinary.js';

const storage = multer.memoryStorage(); // Use memory storage for file uploads
export const singleUpload = multer({ storage }).single("file"); // Handle single file uploads


export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists with this email.',
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
            profile:{
                ProfilePhoto:cloudResponse.secure_url,
            }
        });

        return res.status(201).json({
            message: "Account created successfully",
            success: true
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Account does not exist with this Email. Register a New Account",
                success: false,
            });
        }
        

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        console.log("Entered Password:", password);
        console.log("Stored Hash:", user.password);
        console.log("Password Match:", isPasswordMatch);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false,
            });
        }

        // Check if role matches
        if (role !== user.role) {
            return res.status(400).json({
                message: "No account exists with the current role.",
                success: false
            });
        }

        console.log('Secret Key:', process.env.SECRET_KEY);  // Debugging statement


        const tokenData = {
            userId: user._id
        };
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpOnly: true, sameSite: 'strict' }).json({
            message: `Welcome ${user.fullname}`,
            user,
            success: true
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Logged out successfully.",
            success: true
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        console.log(fullname, email, phoneNumber, bio, skills);
        const file = req.file;

        console.log("Request Body:", req.body);
        console.log("Uploaded File:", req.file);

        //cloudinary
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        console.log("Cloudinary Config:");
        console.log("CLOUD_NAME:", process.env.CLOUD_NAME);
        console.log("API_KEY:", process.env.API_KEY);
        console.log("API_SECRET:", process.env.API_SECRET);
        

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }

        const userId = req.id; // Middleware Authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found",
                success: false,
            });
        }

        // Ensure profile object exists
        if (!user.profile) user.profile = {};

        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillsArray;

        //cloudniaryforResume
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url,{
            };
            user.profile.resumeOriginalName = file.originalname;  // Saving resume name
        }
        

        await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            user,
            success: true,
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

