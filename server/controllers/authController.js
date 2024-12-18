import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
import models from '../models/index.js';
import {BlobServiceClient} from "@azure/storage-blob";
import dotenv from "dotenv";

dotenv.config();
const { Teacher, Student } = models;

const AZURE_STORAGE_CONNECTION_STRING = process.env.AZURE_STORAGE_CONNECTION_STRING;
const containerName = "profile-images";
const blobServiceClient = BlobServiceClient.fromConnectionString(AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(containerName);

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
        classId: User.class_id,
        gradeId: User.grade_id,
        firstName: User.firstName,
        lastName: User.lastName,
        email: User.email,
        gender: User.gender,
        password: User.password,
        type: user,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error logging in');
  }
};

export const getUserInfo = async (req, res) => {
  const userId = req.userId; // Assuming you use session or JWT to authenticate

  try {
    const student = await Student.findByPk(userId);
    const teacher = await Teacher.findByPk(userId);
    if (!student && !teacher) {
      return res.status(404).json({ message: 'User not found' });
    }
    const user = student || teacher;
    let formattedUser = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      gender: user.gender,
      image: user.image,
      type: student ? 'student' : 'teacher',
    }
    if (student) {
      formattedUser = {
        ...formattedUser,
        classId: student.class_id,
        gradeId: student.grade_id,
      }
    }

    res.status(200).json({ user: formattedUser });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const Logout = async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  });
  res.status(200).json({ message: "Logged out" });
};

const uploadImageToAzure = async (imageBuffer, imageName) => {
  const blockBlobClient = containerClient.getBlockBlobClient(imageName);
  await blockBlobClient.upload(imageBuffer, imageBuffer.length);
  return blockBlobClient.url; // Return URL of uploaded image
};

export const addProfileImage = async (req, res) => {
  const userId = req.userId;
  const imageBuffer = req.file.buffer;

  if (!imageBuffer) {
    return res.status(400).send('No image file provided');
  }

  const imageName = `${userId}-${Date.now()}-${req.file.originalname}`;
  try {
    const imageUrl = await uploadImageToAzure(imageBuffer, imageName);

    await Student.update({ image: imageUrl }, { where: { id: userId } });
    res.status(200).json({ message: "Profile image uploaded successfully", imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error uploading image');
  }
};

export const deleteProfileImage = async (req, res) => {
  const userId = req.userId;

  try {
    const student = await Student.findByPk(userId);
    if (!student || !student.image) {
      return res.status(404).json({ message: 'User not found or no image to delete' });
    }

    const imageUrl = student.image;
    const imageName = imageUrl.split('/').pop(); // Extract the image name from URL

    // Delete image from Azure Blob Storage
    const blockBlobClient = containerClient.getBlockBlobClient(imageName);
    await blockBlobClient.delete();

    await Student.update({ image: null }, { where: { id: userId } });
    res.status(200).json({ message: "Profile image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error deleting image');
  }
};
