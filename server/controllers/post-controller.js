import { validationResult } from "express-validator";

//components
import Post from "../models/Post.js";
import User from "../models/User.js";
import Profile from "../models/Profile.js";

//createPost
export const createPost = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  try {
    const user = await User.findById(req.user.id).select("-password");
    const newPost = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };

    const post = new Post(newPost);
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
