import express from 'express';
import userController from '../controllers/userController';

const router:any = express.Router();

router.post('/register', userController.createUser);
router.post('/login', userController.login);

router.post('/create-users', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

export default router;
