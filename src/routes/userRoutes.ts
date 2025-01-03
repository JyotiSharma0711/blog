import express from 'express';
import userController from '../controllers/userController';

const router:any = express.Router();

router.post('/register', userController.createUser
);
router.post('/login', userController.login);

// router.post('/user', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/user/:id', userController.getUserById);
router.put('/user/:id', userController.updateUser);
router.delete('/user/:id', userController.deleteUser);

export default router;
