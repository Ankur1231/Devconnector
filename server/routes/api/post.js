import express from "express";
import { check } from "express-validator";

//components
import checkJwt from "../../middleware/auth.js";
import {
  createPost,
  getPosts,
  getPostById,
  deletePost,
  likePost,
  addComment,
  deleteComment,
} from "../../controllers/post-controller.js";

const router = express.Router();

//@route  POST api/post
//@desc   Create a post
//@access Private
router.post("/", [checkJwt, [check("text", "text is required").not().isEmpty()]], createPost);

//@route  GET api/post
//@desc   Get all post
//@access Private
router.get("/", checkJwt, getPosts);

//@route  GET api/post/:post_id
//@desc   Get post by ID
//@access Private
router.get("/:post_id", checkJwt, getPostById);

//@route  DELETE api/post/:post_id
//@desc   Delete a post
//@access Private
router.delete("/:post_id", checkJwt, deletePost);

//@route  PUT api/post/like/:post_id
//@desc   like/unlike a post
//@access Private
router.put("/like/:post_id", checkJwt, likePost);

//@route POST api/post/comment/:post_id
//@desc   add comment
//@access Private
router.post(
  "/comment/:post_id",
  [checkJwt, [check("text", "Text is required").not().isEmpty()]],
  addComment
);

//@route DELETE api/post/comment/:post_id/:comm_id
//@desc   delete comment
//@access Private
router.delete("/comment/:post_id/:comm_id", checkJwt, deleteComment);

export default router;
