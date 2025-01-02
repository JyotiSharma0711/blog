import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import blogRoutes from './routes/blogRoutes';
import userRoutes from './routes/userRoutes'
import tagRoutes from './routes/tags';
import blogTagRoutes from './routes/blogTags';
import likeRoutes from './routes/likes';
import commentRoutes from '../src/routes/comments'
import { config } from 'dotenv';
import { connectDB } from './config/db';

const app = express();
config();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

connectDB();

app.use('/', blogRoutes);
app.use('/', userRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/blog-tags', blogTagRoutes);
app.use('/api/likes', likeRoutes);
app.get('/', (req, res) => {
    res.send('Hello, Amit here!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});