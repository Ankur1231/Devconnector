import User from "../models/User.js";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json("server error");
  }
};

export const loginUser = async (req, res) => {
  //validate body
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { email, password } = req.body;

  try {
    //See if user exist
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ error: [{ msg: "invalid credentials" }] });
    }

    //compare hashed password and password send by user
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).json({ error: [{ msg: "invalid credentials" }] });
    }

    //Return Jsonwebtoken
    const payload = {
      user: {
        id: existingUser.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "5h",
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
    res.status(200);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
