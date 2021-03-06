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

//getPosts
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//getPostById
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "post not found" });
    }
    console.log(error);
    res.status(500).json(error);
  }
};

//deletePost
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }
    //check user
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "unauthorized user" });
    }
    await post.remove();
    res.status(200).json({ msg: "post removed" });
  } catch (error) {
    if (error.kind === "ObjectId") {
      return res.status(404).json({ msg: "post not found" });
    }
    console.log(error);
    res.status(500).json(error);
  }
};

//likePost
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }
    const index = post.likes.findIndex((value) => value.user == req.user.id);
    if (index === -1) {
      await post.likes.push({ user: req.user.id });
    } else {
      post.likes.splice(index, 1);
    }
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//addComment
export const addComment = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }
  try {
    const user = await User.findById(req.user.id).select("-pasword");
    const post = await Post.findById(req.params.post_id);

    if (!post) {
      return res.status(404).json({ msg: "post not found" });
    }

    const newComment = {
      text: req.body.text,
      name: user.name,
      avatar: user.avatar,
      user: req.user.id,
    };

    post.comments.unshift(newComment);
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

//deleteComment
export const deleteComment = async (req, res) => {
  try {
    // const post = await Post.findById(req.params.post_id);

    // console.log(post);

    // //pulling out the comment
    // const comment = post.comments.find((comment) => comment._id.toString() === req.params.comm_id);
    // if (!comment) {
    //   return res.status(404).json({ msg: "comment not found" });
    // }

    // if (comment.user.toString() !== req.user.id) {
    //   return res.status(401).json({ msg: "unauthorized user" });
    // }

    // //deleting the comment
    // comment.remove();
    // await post.save();

    const post = await Post.findOneAndUpdate(
      { "comments._id": req.params.comm_id, "comments.user": req.user.id },
      {
        $pull: {
          comments: {
            user: req.user.id,
            _id: req.params.comm_id,
          },
        },
      },
      { new: true }
    );
    if (!post) {
      return res.status(404);
    }
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
