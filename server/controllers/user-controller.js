import { validationResult } from "express-validator";
import User from "../models/User.js";
import gravatar from "gravatar";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const userRegistration = async (req, res) => {
  // validating body
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { name, email, password } = req.body;

  try {
    // See if user exist
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: [{ message: "User already exist" }] });
    }

    //Get user gravatar
    const avatar = gravatar.url(email, {
      s: "200",
      r: "pg",
      d: "mm",
    });

    //Encrypt password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
      return res.status(500).json({ error: [{ msg: error }] });
    }

    //Creating UserModel to send to DB
    const CreatedUser = new User({
      name,
      email,
      avatar,
      password: hashedPassword,
    });

    await CreatedUser.save();

    //Return Jsonwebtoken
    const payload = {
      user: {
        id: CreatedUser.id,
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
