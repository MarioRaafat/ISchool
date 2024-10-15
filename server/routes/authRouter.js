import Router from 'express';
import {login} from '../controllers/authController.js';
import {verifyToken} from "../middlewares/verifyToken.js";
import multer from 'multer';

const authRouter = Router();
const upload = multer({dest: "uploads/profiles"});

authRouter.post('/login', login);

export default authRouter;