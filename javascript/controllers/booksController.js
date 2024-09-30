var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getBooks, edit, deleteBookFromDB, add } from "../services/booksService.js";
export const addBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookName = req.body.title;
        const userId = req.user.userId;
        // const decode:any = req.header.
        if (!bookName) {
            res.status(400).json({ error: "bookName  is required." });
            return;
        }
        const book = yield add(bookName, userId);
        res.status(201).json({ bookId: book.id, book: book });
    }
    catch (error) {
        if (error.message === "Username already exists.") {
            res.status(409).json({ error: error.message });
        }
        else {
            console.error("Error registering user:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
});
export const deleteBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const bookId = req.params.bookId;
        if (!userId) {
            res.status(400).json({ error: "Username and password are required." });
            return;
        }
        yield deleteBookFromDB(userId, bookId);
        res.status(200).json({ success: "Internal server success." });
    }
    catch (error) {
        if (error.message === "Username already exists.") {
            res.status(409).json({ error: error.message });
        }
        else {
            console.error("Error registering user:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
});
export const editBook = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        const updatedData = req.body.updatedData;
        const bookId = req.params.bookId;
        if (!userId || !updatedData) {
            res.status(400).json({ error: "Username and password are required." });
            return;
        }
        const book = yield edit(userId, bookId, updatedData);
        res.status(201).json({ book });
    }
    catch (error) {
        if (error.message === "Username already exists.") {
            res.status(409).json({ error: error.message });
        }
        else {
            console.error("Error registering user:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
});
export const getAllBooks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.userId;
        if (!userId) {
            res.status(400).json({ error: "Username and password are required." });
            return;
        }
        const books = yield getBooks(userId);
        res.status(200).json(books);
    }
    catch (error) {
        // you can also check for unkown if it instance of Error.
        if (error.message === "Invalid username or password.") {
            res.status(401).json({ error: error.message });
        }
        else {
            console.error("Error during login:", error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
});
