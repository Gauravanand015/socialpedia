import { Post } from "../models/post-model.js";
import { User } from "../models/user-model.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const post = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      occupation: user.occupation,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comment: [],
    });

    await post.save();

    const allPost = post.find();
    res.status(201).json(allPost);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const allPost = await Post.find();
    res.status(200).json(allPost);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getUserPost = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.findById(userId);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatePost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatePost);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
