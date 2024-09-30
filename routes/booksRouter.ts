import express, { Router } from 'express';
import { addBook, deleteBook, editBook, getAllBooks } from '../controllers/booksController.js';
import authMiddleware from '../middleware/authMiddleware.js';


const router: Router = express.Router();


router.route('/').get(getAllBooks);
router.route('/').post(addBook);
router.route('/:bookId').put(editBook);
router.route('/:bookId').delete(deleteBook);


export default router;