import { Request, Response } from 'express';
import { Book } from '../models/types.js'
import { getBooks, edit, deleteBookFromDB, add } from "../services/booksService.js";


export const addBook = async (req: Request, res: Response): Promise<void> => {
    try {
      const bookName: string = req.body.title;
      const userId: string = (req as any).user.userId;
      // const decode:any = req.header.
  
      if (!bookName) {
        res.status(400).json({ error: "bookName  is required." });
        return;
      }
  
      const book: Book = await add(bookName, userId);
      res.status(201).json({ bookId: book.id, book:book } );
    } catch (error: any) {
      if (error.message === "Username already exists.") {
        res.status(409).json({ error: error.message });
      } else {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error." });
      }
    }
  };
  
  export const deleteBook = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId: string = (req as any).user.userId;
      const bookId: string = req.params.bookId;
  
      if (!userId) {
        res.status(400).json({ error: "Username and password are required." });
        return;
      }
      await deleteBookFromDB(userId, bookId);
      res.status(200).json({ success: "Internal server success." });
    } catch (error: any) {
      if (error.message === "Username already exists.") {
        res.status(409).json({ error: error.message });
      } else {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error." });
      }
    }
  };


  export const editBook = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId: string = (req as any).user.userId;
      const updatedData : string =  req.body.updatedData;
      const bookId: string = req.params.bookId;
  
      if (!userId || !updatedData) {
        res.status(400).json({ error: "Username and password are required." });
        return;
      }
  
      const book = await edit(userId, bookId ,updatedData );
      res.status(201).json({ book} );
    } catch (error: any) {
      if (error.message === "Username already exists.") {
        res.status(409).json({ error: error.message });
      } else {
        console.error("Error registering user:", error);
        res.status(500).json({ error: "Internal server error." });
      }
    }
  };
  
  export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId: string = (req as any).user.userId;
  
      if (!userId) {
        res.status(400).json({ error: "Username and password are required." });
        return;
      }
  
      const books = await getBooks(userId);
      res.status(200).json(books);
    } catch (error: any) {
      // you can also check for unkown if it instance of Error.
      if (error.message === "Invalid username or password.") {
        res.status(401).json({ error: error.message });
      } else {
        console.error("Error during login:", error);
        res.status(500).json({ error: "Internal server error." });
      }
    }
  };
  
  