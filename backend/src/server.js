import express from 'express';
import cors from 'cors';
import bookRoutes from './routes/books.js';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', bookRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));