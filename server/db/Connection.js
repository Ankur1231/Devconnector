import mongoose from "mongoose";

const Connection = async (username, password) => {
  const url = `mongodb+srv://${username}:${password}@cluster0.tkr1p.mongodb.net/Devconnector?retryWrites=true&w=majority`;
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to database successfully");
  } catch (error) {
    console.log("error connecting to databse", error);
  }
};

export default Connection;
