import express from 'express';
import blogTagController from '../controllers/blogTagController';

const router:any = express.Router();

router.post('/', blogTagController.create);
router.delete('/:id', blogTagController.delete);

export default router;
