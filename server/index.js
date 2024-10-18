import express from 'express';
import dotenv from 'dotenv';
import models from './models/index.js';
import routes from './routes/index.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from "./routes/authRouter.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const origin = process.env.ORIGIN_DEV;
const corsOptions = {
	origin: origin,
	credentials: true,
	methods: ['GET, POST, PUT, DELETE'],
};


//app.use("/uploads/profiles", express.static("uploads/profiles"));  
// we will need it if we decided to store the images in the server for students and teachers

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());


app.use('/api/author', authRouter);
app.use('/api', routes);

models.sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
});