import express from 'express';
import likeController from '../controllers/likeController';

const router:any = express.Router();

router.post('/', likeController.create);
router.get('/blog/:blogId', likeController.getLikesByBlogId);
router.delete('/:id', likeController.delete);

export default router;
