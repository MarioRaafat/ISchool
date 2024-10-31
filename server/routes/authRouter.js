import Router from 'express';
import {login, getUserInfo, Logout} from '../controllers/authController.js';
import {verifyToken} from "../middlewares/verifyToken.js";
import multer from 'multer';

const authRouter = Router();
const upload = multer({dest: "uploads/profiles"});

authRouter.post('/login', login);
authRouter.get('/user-info', verifyToken, getUserInfo);
// authRouter.post('/add-profile-image', verifyToken, upload.single('profileImage'), addProfileImage);
// authRouter.post('/delete-profile-image', verifyToken, deleteProfileImage);
// authRouter.post('/update-user-info', verifyToken, updateUserInfo);
authRouter.post('/logout', verifyToken, Logout);

export default authRouter;