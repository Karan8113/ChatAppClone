import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, userName, password, confirmPassword, gender } = req.body;

    if (!fullName || !userName || !password || !confirmPassword || !gender) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Please confirm the password",
      });
    }

    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({
        message: "Username already exists... Please enter unique userName",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // get profile photo from internet using API

    const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    await User.create({
      fullName: fullName,
      userName: userName,
      password: hashedPassword,
      profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
      gender: gender,
    });

    return res.status(201).json({
      message: "User successfully created",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    if (!userName || !password) {
      return res.status(400).json({
        message: "Please Enter Username or Password",
      });
    }

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(400).json({
        message:
          "User Not Found in the database .. Please enter the valid username",
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(400).json({
        message: "Please enter the valid password",
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
        profilePhoto: user.profilePhoto,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged Out Successfully..",
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOtherUsers = async (req, res) => {
  try {
    const loginUserId = req.id;
    const otherUserId = await User.find({ _id: { $ne: loginUserId } }).select(
      "-password"
    );
    return res.status(200).json({message:otherUserId})

    // console.log(otherUserId);
  } catch (error) {
    console.log(error);
  }
};
