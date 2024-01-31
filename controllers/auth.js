import { User } from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    picturePath,
    friends,
    occupation,
    location,
  } = req.body;
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      picturePath,
      friends,
      occupation,
      location,
      impressions: Math.floor(Math.random() * 1000),
      viewedProfile: Math.floor(Math.random() * 1000),
    });

    const savedData = await newUser.save();
    res.status(200).send({
      Message: "User saved successfully",
      data: savedData,
    });
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const findUser = await User.find({ email: email });
  try {
    if (findUser.length === 0) {
      return res.status(400).send("User does not exist");
    } else {
      const isMatched = bcrypt.compareSync(password, findUser[0].password);
      if (!isMatched) res.status(400).send("Invalid Credentials");
      else {
        const token = jwt.sign(
          { email: findUser[0].email, userId: findUser[0]._id },
          "SECRET"
        );
        res.status(200).send({
          message: "User login successfully",
          token: token,
        });
      }
    }
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};
