import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const userController = {
    // Create user
    createUser: async (req: Request, res: Response) => {
        try {
            const { name, email, password, profileImage } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            
            const user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    profileImage
                }
            });

            return res.status(201).json({
                success: true,
                message: 'User created successfully',
                data: { ...user, password: undefined }
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: 'Error creating user',
                error: error.message
            });
        }
    },

    // Get all users
    getUsers: async (req: Request, res: Response) => {
        try {
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

            return res.status(200).json({
                success: true,
                message: 'Users fetched successfully',
                data: users
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: 'Error fetching users',
                error: error.message
            });
        }
    },

    // Get user by ID
    getUserById: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
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
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            return res.status(200).json({
                success: true,
                message: 'User fetched successfully',
                data: user
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: 'Error fetching user',
                error: error.message
            });
        }
    },

    // Update user
    updateUser: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { name, email, profileImage } = req.body;

            const user = await prisma.user.update({
                where: { id },
                data: {
                    name,
                    email,
                    profileImage
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    profileImage: true,
                    createdAt: true,
                    updatedAt: true
                }
            });

            return res.status(200).json({
                success: true,
                message: 'User updated successfully',
                data: user
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: 'Error updating user',
                error: error.message
            });
        }
    },

    // Delete user
    deleteUser: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await prisma.user.delete({
                where: { id }
            });

            return res.status(200).json({
                success: true,
                message: 'User deleted successfully'
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                message: 'Error deleting user',
                error: error.message
            });
        }
    }
};

export default userController;
