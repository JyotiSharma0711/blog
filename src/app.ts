import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import blogRoutes from './routes/blogRoutes';

const app = express();
import { config } from 'dotenv';

config();

const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyParser.json());

app.use('/', blogRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});