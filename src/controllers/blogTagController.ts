import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const blogTagController = {
    create: async (req: Request, res: Response) => {
        try {
            const { blogId, tagId } = req.body;
            const blogTag = await prisma.blogTag.create({
                data: { blogId, tagId }
            });
            return res.status(201).json({
                success: true,
                data: blogTag
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
            await prisma.blogTag.delete({
                where: { id }
            });
            return res.status(200).json({
                success: true,
                message: 'BlogTag deleted successfully'
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
};

export default blogTagController;
