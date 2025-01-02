import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';


const prisma = new PrismaClient();

const userController = {

    login: async (req: Request, res: Response) => {
        try {
            console.log("Login attempt for email:", req.body.email);
            const { email, password } = req.body;
            
            const user = await prisma.user.findUnique({
                where: { email }
            });

            if (!user) {
                console.log("Login failed: User not found for email:", email);
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            const isValidPassword = await bcrypt.compare(password, user.password);
            
            if (!isValidPassword) {
                console.log("Login failed: Invalid password for email:", email);
                return res.status(401).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            console.log("Login successful for user:", user.id);
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
            console.error("Login error:", error);
            return res.status(500).json({
                success: false,
                message: 'Error during login',
                error: error.message
            });
        }
    },

    createUser: async (req: Request, res: Response) => {
        try {
            console.log("Creating new user with email:", req.body.email);
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

            console.log("User created successfully with ID:", user.id);
            return res.status(201).json({
                success: true,
                message: 'User created successfully',
                data: { ...user, password: undefined }
            });
        } catch (error: any) {
            console.error("User creation error:", error);
            return res.status(500).json({
                success: false,
                message: 'Error creating user',
                error: error.message
            });
        }
    },

    getUsers: async (req: Request, res: Response) => {
        try {
            console.log("Fetching all users");
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

            console.log(`Retrieved ${users.length} users`);
            return res.status(200).json({
                success: true,
                message: 'Users fetched successfully',
                data: users
            });
        } catch (error: any) {
            console.error("Error fetching users:", error);
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
            console.log("Fetching user with ID:", id);
            
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
                console.log("User not found with ID:", id);
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            console.log("User found:", user.id);
            return res.status(200).json({
                success: true,
                message: 'User fetched successfully',
                data: user
            });
        } catch (error: any) {
            console.error("Error fetching user:", error);
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
            console.log("Updating user with ID:", id);
            
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

            console.log("User updated successfully:", user.id);
            return res.status(200).json({
                success: true,
                message: 'User updated successfully',
                data: user
            });
        } catch (error: any) {
            console.error("Error updating user:", error);
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
            console.log("Deleting user with ID:", id);
            
            await prisma.user.delete({
                where: { id }
            });

            console.log("User deleted successfully:", id);
            return res.status(200).json({
                success: true,
                message: 'User deleted successfully'
            });
        } catch (error: any) {
            console.error("Error deleting user:", error);
            return res.status(500).json({
                success: false,
                message: 'Error deleting user',
                error: error.message
            });
        }
}};

export default userController;
