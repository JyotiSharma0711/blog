import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const commentController = {
    create: async (req: Request, res: Response) => {
        try {
            const { content, blogId, userId } = req.body;
            const comment = await prisma.comment.create({
                data: { content, blogId, userId }
            });
            return res.status(201).json({
                success: true,
                data: comment
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    getByBlogId: async (req: Request, res: Response) => {
        try {
            const { blogId } = req.params;
            const comments = await prisma.comment.findMany({
                where: { blogId },
                include: { user: true }
            });
            return res.status(200).json({
                success: true,
                data: comments
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    update: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { content } = req.body;
            const comment = await prisma.comment.update({
                where: { id },
                data: { content }
            });
            return res.status(200).json({
                success: true,
                data: comment
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    delete: async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await prisma.comment.delete({
                where: { id }
            });
            return res.status(200).json({
                success: true,
                message: 'Comment deleted successfully'
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
};

export default commentController;
