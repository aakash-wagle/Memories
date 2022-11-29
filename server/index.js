import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from "dotenv";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/user.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/posts", postRoutes); // adds a prefix of /posts to all our routes in postRoutes
app.use("/user", userRoutes);

// username and password to be stored in environmental variables
const DB_CONNECTION_URL = process.env.CONNECTION_URL;
const PORT = 5000;

mongoose
  .connect(DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo connect ho gaya"))
  .catch((err) => console.log(err.message));

  app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))


// // useFindAndModify is deprecated
// mongoose.set('useFindAndModify', false);
