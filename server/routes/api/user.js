import express from "express";
import { check, validationResult } from "express-validator";

//components
import { userRegistration } from "../../controllers/user-controller.js";

const router = express.Router();

//@route  POST api/users
//@desc   Register user
//@access Public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Please enter a password with 6 or more characters").isLength({ min: 6 }),
  ],
  userRegistration
);

export default router;
