// server.js

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
import { config } from 'dotenv';
config();

const PORT = process.env.PORT || 5000;// Middleware
app.use(cors());
app.use(bodyParser.json());

// // Use post routes
// app.use('/api/posts', postRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});