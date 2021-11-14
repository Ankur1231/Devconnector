import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const checkJwt = (req, res, next) => {
  //get token from header
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "no token unauthorized access" });
  }

  //Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "invalid token" });
  }
};

export default checkJwt;
