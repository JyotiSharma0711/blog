import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const likeController = {
    create: async (req: Request, res: Response) => {
        try {
            const { blogId, userId } = req.body;
            const like = await prisma.like.create({
                data: { blogId, userId }
            });
            return res.status(201).json({
                success: true,
                data: like
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    getLikesByBlogId: async (req: Request, res: Response) => {
        try {
            const { blogId } = req.params;
            const likes = await prisma.like.findMany({
                where: { blogId },
                include: { user: true }
            });
            return res.status(200).json({
                success: true,
                data: likes
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
            await prisma.like.delete({
                where: { id }
            });
            return res.status(200).json({
                success: true,
                message: 'Like removed successfully'
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
};

export default likeController;
