// server/controllers/authController.js
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import models from '../models/index.js';

const { Teacher, Student } = models;

const createToken = async (email, id) => {
  return jwt.sign({ email, id }, process.env.JWT_KEY, {
    expiresIn: "3d",
  });
};

export const login = async (req, res) => {
  const { email, password, user } = req.body;

  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  try {
    let User;
    if (user === "teacher") {
      User = await Teacher.findOne({ where: { email } });
    } else if (user === "student") {
      User = await Student.findOne({ where: { email } });
    } else {
      return res.status(400).json({ message: 'Invalid user type' });
    }

    if (!User) {
      return res.status(404).json({ message: 'User not found' });
    }
    const validPassword = await compare(password, User.password);
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    const token = await createToken(User.email, User.id);
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.status(200).json({
      token,
      user: {
        id: User.id,
        firstName: User.firstName,
        lastName: User.lastName,
        email: User.email,
        phone: User.phone,
        gender: User.gender,
        password: User.password,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error logging in');
  }
};