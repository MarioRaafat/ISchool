import Router from 'express';
import { login, getUserInfo, Logout, addProfileImage, deleteProfileImage } from '../controllers/authController.js';
import { verifyToken } from "../middlewares/verifyToken.js";
import multer from 'multer';

// Set up multer storage for profile images
const storage = multer.memoryStorage(); // Store file in memory for processing
const upload = multer({ storage: storage }).single('image'); // Expect 'image' field in form data

const authRouter = Router();

authRouter.post('/login', login);
authRouter.get('/user-info', verifyToken, getUserInfo);
authRouter.post('/add-profile-image', verifyToken, upload, addProfileImage);
authRouter.post('/delete-profile-image', verifyToken, deleteProfileImage);
authRouter.post('/logout', verifyToken, Logout);

export default authRouter;
