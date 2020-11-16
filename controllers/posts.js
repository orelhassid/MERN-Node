import mongoose from "mongoose";
import PostMessage from "../models/postMessage.js";

export const getPosts = async (req, res) => {
  try {
    const messages = await PostMessage.find();
    res.status(200).json(messages);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("The post id is inValid.");

  try {
    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).send("The post with the given id was not found.");
  }
};

export const deletePost = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const removedPost = await PostMessage.findByIdAndRemove(_id);
    res.status(200).json(removedPost);
  } catch (error) {
    console.error(error);
  }
};

export const likePost = async (req, res) => {
  const { id: _id } = req.params;

  try {
    const post = await PostMessage.findById(_id);

    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
  }
};
