import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export async function getPosts(req, res) {
  try {
    const postMessages = await PostMessage.find();
    console.log(postMessages);
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}


// BEFORE BEARER TOKEN USAGE
// export async function createPost(req, res) {
//   const post = req.body; //Frontend needed to determine which input field to grab
//   console.log("Logging post data in backend");
//   console.log(post);
//   const newPost = new PostMessage(post);

//   try {
//     await newPost.save();
//     res.status(201).json(newPost);
//   } catch (error) {
//     res.status(409).json({ message: error.message });
//   }
// }

export const createPost = async (req, res) => {
  const post = req.body; //Frontend needed to determine which input field to grab
  // console.log("Logging post data in backend");
  // console.log(post);
  const newPost = new PostMessage({...post, creator: req.userID, createdAt: new Date().toISOString()});

  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
}

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  console.log("Logging post");
  console.log(post);
  console.log("Logging _id");
  console.log(_id);
  console.log("Logging req.userID");
  console.log(req.userID);
  if (!req.userID) return res.json({ message: "Unauthorized Access" });
  console.log("Successful mongo access");

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });
    console.log("Logging updated post");
    console.log(updatedPost);
    res.json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  await PostMessage.findByIdAndDelete(_id);

  res.json({ message: "Post Deleted" });
};

export const likePost = async (req, res) => {
  console.log("likePost controller hit");
  const { id: _id } = req.params;
  // const post = req.body;
  // console.log(`${req.userID} req.userID`);

  if (!req.userID) return res.json({ message: "Unauthorized Access" });

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No post with that id");

  try {
    const post = await PostMessage.findById(_id);
    // console.log(`Post in likedpost: ${post}`);

    const index = post.likes.findIndex((id) => id === String(req.userID));

    if (index === -1) {
      post.likes.push(req.userID);
      console.log(`${req.userID} Like pushed`);
    } else {
      post.likes = post.likes.filter((id) => id !== String(req.userID));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
      new: true,
    });
    res.json(updatedPost);
  } catch (error) {
    console.log(error);
  }
};
