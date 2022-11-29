import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser) res.status(404).json({ message: "User does not exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      res.status(400).json({ message: "Invalid login credentials" });

    // First parameter is all the info to be stored inside the token
    // Second parameter is the secret
    // Third parameter is the options
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;

  try {
    // Checking if an account corresponding to given email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) res.status(404).json({ message: "User already exists" });

    if (password !== confirmPassword)
      res.status(400).json({ message: "Passwords do not match" });

    // Second parameter is the level of difficulty called salt
    const hashedPassowrd = await bcrypt.hash(password, 12);

    const createdUser = await User.create({
      email,
      password: hashedPassowrd,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign(
      { email: createdUser.email, id: createdUser._id },
      "test",
      { expiresIn: "1h" }
    );

    res.status(200).json({ result: createdUser, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
