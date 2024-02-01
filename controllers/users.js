import { User } from "../models/user-model.js";

export const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

export const getUserFriends = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedData = friends.map(
      ({ _id, firstName, lastName, picturePath, occupation, location }) => {
        return { _id, firstName, lastName, picturePath, occupation, location };
      }
    );

    res.status(200).json(formattedData);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};

export const addRemoveFriends = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    console.log(id, friendId);
    console.log("HERE");
    console.log(req.body);
    const user = await User.findById(id);
    const friend = await User.findById(friendId);
    console.log(user.friends);
    if (user.friends.includes(friend)) {
      user.friends = user.friends.filter((friend) => friend !== friendId);
      friend.friends = friend.friends.filter((friend) => friend !== friendId);
    } else {
      user.friends.push(friendId);
      friend.friends.push(id);
    }
    await user.save();
    await friend.save();

    const friends = await Promise.all(
      user.friends.map((id) => User.findById(id))
    );

    const formattedData = friends.map(
      ({ _id, firstName, lastName, picturePath, occupation, location }) => {
        return { _id, firstName, lastName, picturePath, occupation, location };
      }
    );

    res.status(200).json(formattedData);
  } catch (error) {
    res.status(404).json({
      error: error.message,
    });
  }
};
