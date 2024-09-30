import { User } from "../models/types";
import { v4 as uuidv4 } from "uuid";
import { readFromJsonFile, writeToJsonFile } from "../dal/access.js"
import bcrypt from "bcrypt"

export const registerUser = async (userName: string,password: string): Promise<User> => {
  const users: User[] = await readFromJsonFile();
  const existingUser = users.find((u) => u.userName === userName);

  if (existingUser) {
    throw new Error("Username already exists.");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);

  const newUserId: string = uuidv4();
  
  const newUser: User = {
    id: newUserId ,
    userName,
    password: hashedPassword,
    books: [],
  };

  await writeToJsonFile(newUser);
  return newUser;
};

export const authenticateUser = async (userName: string, password: string): Promise<User> => {
  const users: User[] = await readFromJsonFile();
  const userFind = users.find((u) => u.userName === userName);

  if (!userFind) {
    throw new Error("Invalid username or password.");
  }

  const passwordMatch = bcrypt.compareSync(password, userFind.password);

  if (!passwordMatch) {
    throw new Error("Invalid username or password.");
  }

  return userFind;
};
