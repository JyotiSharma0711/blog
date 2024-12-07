// let posts: any = [];

// export const getPosts = (req: Request, res: Response) => {
//     res.json(posts);
// };

// export const createPost = (req: any, res: any) => {
//     const { title, content } = req.body;
//     if (!title || !content) {
//         return res.status(400).json({ message: 'Title and content are required' });
//     }
//     const newPost: { id: number; title: string; content: string } = { id: posts.length + 1, title, content };
//     posts.push(newPost);
//     res.status(201).json(newPost);
// };