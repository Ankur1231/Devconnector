import express from "express";
import { check } from "express-validator";

const router = express.Router();

//component
import checkJwt from "../../middleware/auth.js";
import {
  getMyProfile,
  createProfile,
  getAllProfile,
  getOneProfile,
} from "../../controllers/profile-controller.js";

//@route  GET api/profile/me
//@desc   Get the current user profile
//@access Private
router.get("/me", checkJwt, getMyProfile);

//@route  POST api/profile
//@desc   Create or update user profile
//@access Private
router.post(
  "/",
  [
    checkJwt,
    [
      check("status", "status is required").not().isEmpty(),
      check("skills", "skills is required").not().isEmpty(),
    ],
  ],
  createProfile
);

//@route  GET api/profile
//@desc   get all profiles
//@access Public
router.get("/", getAllProfile);

//@route  GET api/profile/user/:user_id
//@desc   get a specific user profile
//@access Public
router.get("/user/:user_id", getOneProfile);

export default router;
