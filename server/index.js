import express from 'express';
import dotenv from 'dotenv';
import models from './models/index.js';
import routes from './routes/index.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3300;

app.use(express.json());
app.use('/', routes);

models.sequelize.sync().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
});