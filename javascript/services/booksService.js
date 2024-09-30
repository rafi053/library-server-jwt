var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { v4 as uuidv4 } from "uuid";
import { readFromJsonFile, writeUsersToJsonFile, } from "../dal/access.js";
export const getBooks = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield readFromJsonFile();
    const user = users.find((u) => u.id === userId);
    const books = user === null || user === void 0 ? void 0 : user.books;
    if (!user) {
        throw new Error("Username already exists.");
    }
    if (books) {
        return books;
    }
});
export const edit = (userId, bookId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield readFromJsonFile();
    const userFind = users.find((u) => u.id === userId);
    if (!userFind) {
        throw new Error("Invalid username or password.");
    }
    const books = userFind.books;
    const bookFind = books.find((b) => b.id === bookId);
    if (!bookFind) {
        throw new Error("Invalid username or password.");
    }
    const updateBook = {
        id: bookFind.id,
        title: updatedData,
        author: bookFind.author,
    };
    const index = books.findIndex((i) => i.id === bookFind.id);
    books[index] = updateBook;
    yield writeUsersToJsonFile(users);
    return updateBook;
});
export const deleteBookFromDB = (userId, bookId) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield readFromJsonFile();
    const userFind = users.find((u) => u.id === userId);
    if (!userFind) {
        throw new Error("Invalid username or password.");
    }
    const books = userFind.books;
    const bookFind = books.find((b) => b.id === bookId);
    if (!bookFind) {
        throw new Error("Invalid username or password.");
    }
    const index = books.findIndex((i) => i.id === bookFind.id);
    books.splice(index, 1);
    yield writeUsersToJsonFile(users);
});
export const add = (bookName, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield readFromJsonFile();
    const userFind = users.find((u) => u.id === userId);
    if (!userFind) {
        throw new Error("Invalid username or password.");
    }
    const books = userFind.books;
    const authorAPI = "API";
    const bookId = uuidv4();
    const newBook = {
        id: bookId,
        title: bookName,
        author: authorAPI,
    };
    books.push(newBook);
    yield writeUsersToJsonFile(users);
    return newBook;
});
