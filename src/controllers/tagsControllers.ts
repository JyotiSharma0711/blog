import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const tagController = {
    create: async (req: Request, res: Response) => {
        try {
            const { name } = req.body;
            const tag = await prisma.tag.create({
                data: { name }
            });
            return res.status(201).json({
                success: true,
                data: tag
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    },

    getAll: async (req: Request, res: Response) => {
        try {
            const tags = await prisma.tag.findMany();
            return res.status(200).json({
                success: true,
                data: tags
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
            await prisma.tag.delete({
                where: { id }
            });
            return res.status(200).json({
                success: true,
                message: 'Tag deleted successfully'
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error.message
            });
        }
    }
};

export default tagController;
