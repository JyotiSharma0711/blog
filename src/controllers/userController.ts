import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
    errorFormat: 'minimal'
});
const userController = {
    login: async (req: Request, res: Response) => {
        try {
            const { email } = req.body;
            logger.info('Login attempt initiated', { email });
            
            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (!user) {
                logger.warn('Login failed: User not found', { email });
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            const isValidPassword = await bcrypt.compare(req.body.password, user.password);
            
            if (!isValidPassword) {
                logger.warn('Login failed: Invalid password', { email });
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            logger.info('Login successful', { userId: user.id });
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                JWT_SECRET,
                { expiresIn: '24h' }
            );

            return res.status(200).json({
                success: true,
                message: 'Login successful',
                data: {
                    token,
                    user: {
                        id: user.id,
                        name: user.name,
                        email: user.email
                    }
                }
            });
        } catch (error: any) {
            logger.error('Login error occurred', { 
                error: error.message,
                stack: error.stack
            });
            return res.status(500).json({
                success: false,
                message: 'Error during login',
                error: error.message
            });
        }
    },

    createUser: async (req: Request, res: Response) => {
        try {
            logger.info('Creating------', req.body);
            const { email, name } = req.body;
            logger.info('Creating new user', { email });
            
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    profileImage: req.body.profileImage
                }
            });

            logger.info('User created successfully', { 
                userId: user.id,
                email: user.email 
            });
            
            return res.status(201).json({
                success: true,
                message: 'User created successfully',
                data: { ...user, password: undefined }
            });
        } catch (error: any) {
            logger.error('User creation failed', {
                error: error.message,
                stack: error.stack
            });
            return res.status(500).json({
                success: false,
                message: 'Error creating user',
                error: error.message
            });
        }
    },

    getUsers: async (req: Request, res: Response) => {
        try {
            logger.info('Fetching all users');
            const users = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    profileImage: true,
                    createdAt: true,
                    updatedAt: true
                }
            });

            logger.info('Users fetched successfully', { count: users.length });
            return res.status(200).json({
                success: true,
                message: 'Users fetched successfully',
                data: users
            });
        } catch (error: any) {
            logger.error('Error fetching users', {
                error: error.message,
                stack: error.stack
            });
            return res.status(500).json({
                success: false,
                message: 'Error fetching users',
                error: error.message
            });
        }
    },

    getUserById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            logger.info('Fetching user by ID', { userId: id });
            
            const user = await prisma.user.findUnique({
                where: { id },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    profileImage: true,
                    createdAt: true,
                    updatedAt: true
                }
            });

            if (!user) {
                logger.warn('User not found', { userId: id });
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            logger.info('User fetched successfully', { userId: id });
            return res.status(200).json({
                success: true,
                message: 'User fetched successfully',
                data: user
            });
        } catch (error: any) {
            logger.error('Error fetching user', {
                userId: req.params.id,
                error: error.message,
                stack: error.stack
            });
            return res.status(500).json({
                success: false,
                message: 'Error fetching user',
                error: error.message
            });
        }
    },

    updateUser: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            logger.info('Updating user', { userId: id });
            
            const user = await prisma.user.update({
                where: { id },
                data: req.body,
                select: {
                    id: true,
                    name: true,
                    email: true,
                    profileImage: true,
                    createdAt: true,
                    updatedAt: true
                }
            });

            logger.info('User updated successfully', { userId: id });
            return res.status(200).json({
                success: true,
                message: 'User updated successfully',
                data: user
            });
        } catch (error: any) {
            logger.error('Error updating user', {
                userId: req.params.id,
                error: error.message,
                stack: error.stack
            });
            return res.status(500).json({
                success: false,
                message: 'Error updating user',
                error: error.message
            });
        }
    },

    deleteUser: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            logger.info('Deleting user', { userId: id });
            
            await prisma.user.delete({
                where: { id }
            });

            logger.info('User deleted successfully', { userId: id });
            return res.status(200).json({
                success: true,
                message: 'User deleted successfully'
            });
        } catch (error: any) {
            logger.error('Error deleting user', {
                userId: req.params.id,
                error: error.message,
                stack: error.stack
            });
            return res.status(500).json({
                success: false,
                message: 'Error deleting user',
                error: error.message
            });
        }
    }
};

export default userController;
