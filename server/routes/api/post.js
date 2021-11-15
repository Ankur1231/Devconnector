import express from "express";
import { check } from "express-validator";

//components
import checkJwt from "../../middleware/auth.js";
import { createPost } from "../../controllers/post-controller.js";

const router = express.Router();

//@route  POST api/post
//@desc   Create a post
//@access Private
router.post(
  "/",
  [checkJwt, [check("text", "text is required").not().isEmpty()]],
  createPost
);

export default router;
