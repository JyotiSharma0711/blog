import express from 'express';
import commentController from '../controllers/commentsControllers';

const router: any = express.Router();

router.post('/', commentController.create);
router.get('/blog/:blogId', commentController.getByBlogId);
router.put('/:id', commentController.update);
router.delete('/:id', commentController.delete);

export default router;
