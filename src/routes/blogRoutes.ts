import express, { Router } from 'express';
import blogController from '../controllers/index';

const router: any = express.Router();

router.post('/create', blogController.createBlog);
router.get('/blogs', blogController.getBlogs);

export default router