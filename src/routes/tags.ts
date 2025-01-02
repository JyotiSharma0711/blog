import express from 'express';
import tagController from '../controllers/tagsControllers';

const router:any = express.Router();

router.post('/', tagController.create);
router.get('/', tagController.getAll);
router.delete('/:id', tagController.delete);

export default router;
