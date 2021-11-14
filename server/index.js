import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//components
import Connection from "./db/Connection.js";
import User from "./routes/api/user.js";
import Auth from "./routes/api/auth.js";
import Profile from "./routes/api/profile.js";
import Post from "./routes/api/post.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;
const username = process.env.MONGO_USER;
const password = process.env.MONGO_PASS;

Connection(username, password);

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api/users", User);
app.use("/api/auth", Auth);
app.use("/api/profile", Profile);
app.use("/api/post", Post);

app.listen(PORT, () => {
  console.log(`server started at port ${PORT}`);
});
