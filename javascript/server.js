import express from 'express';
import authRouter from "./routes/authRouter.js";
import booksRouter from './routes/booksRouter.js';
import dotenv from 'dotenv';
import authMiddleware from './middleware/authMiddleware.js';
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
const port = 3000;
app.use(express.json());
app.use('/', authRouter);
app.use(authMiddleware);
app.use('/books', booksRouter);
app.listen(port, () => {
    console.log(`server listen to port:  ${port}`);
});
