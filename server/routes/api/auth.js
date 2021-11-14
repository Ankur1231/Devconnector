import express from "express";
import { check } from "express-validator";

const router = express.Router();

//component
import { getUsers, loginUser } from "../../controllers/auth-controller.js";
import checkJwt from "../../middleware/auth.js";

//@route  GET api/auth
//@desc   get user data
//@access private
router.get("/", checkJwt, getUsers);

//@route  POST api/login
//@desc   Authenticate user and get token
//@access public
router.post(
  "/",
  [
    check("email", "Please provide a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  loginUser
);

export default router;
