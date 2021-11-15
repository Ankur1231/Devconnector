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
  deleteProfile,
  addExperience,
  deleteExperience,
  addEducation,
  deleteEducation,
  getRepo,
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

//@route  DELETE api/profile
//@desc   Delete profile,user.posts
//@access Private
router.delete("/", checkJwt, deleteProfile);

//@route  PUT api/profile/experience
//@desc   Add profile experience
//@access Private
router.put(
  "/experience",
  [
    checkJwt,
    [
      check("title", "title is required").not().isEmpty(),
      check("company", "company is required").not().isEmpty(),
      check("from", "from date is required").not().isEmpty(),
    ],
  ],
  addExperience
);

//@route  DELETE api/profile/experience/:exp_id
//@desc   Delete profile experience
//@access Private
router.delete("/experience/:exp_id", checkJwt, deleteExperience);

//@route  PUT api/profile/education
//@desc   Add profile edeucation
//@access Private
router.put(
  "/education",
  [
    checkJwt,
    [
      check("school", "School is required").not().isEmpty(),
      check("degree", "Degree is required").not().isEmpty(),
      check("fieldofstudy", "Field of study is required").not().isEmpty(),
      check("from", "From date is required").not().isEmpty(),
    ],
  ],
  addEducation
);

//@route  DELETE api/profile/education/:edu_id
//@desc   Delete profile edeucation
//@access Private
router.delete("/education/:edu_id", checkJwt, deleteEducation);

//@route  GET api/profile/github/:username
//@desc   Get github repos
//@access Public
router.get("/github/:username", getRepo);

export default router;
