import express from 'express';
import userController from '../controllers/users/userController';

const router:any = express.Router();

router.post('/create-users', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

export default router;
