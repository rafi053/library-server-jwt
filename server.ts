import express, { Application } from 'express';
import authRouter from "./routes/authRouter.js";
import booksRouter from './routes/booksRouter.js'
import dotenv from  'dotenv';
import authMiddleware from './middleware/authMiddleware.js';


dotenv.config();
const PORT: number | string = process.env.PORT || 3000;

const app: Application = express();





app.use(express.json());

app.use('/',authRouter);
app.use(authMiddleware)
app.use('/books',booksRouter);






app.listen(PORT, ()=> {console.log(`server listen to port:  ${PORT}`);
});
