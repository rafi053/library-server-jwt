import  jsonfile from 'jsonfile';
import { User } from '../models/types';



const DB_FILE_PATH = process.env.DB_FILE_PATH || './data/library.json';


export const writeToJsonFile = async (user: User): Promise<void> => {
  const users: User[] = await jsonfile.readFile(DB_FILE_PATH);
  users.push(user);
  await jsonfile.writeFile(DB_FILE_PATH, users);
};

export const writeUsersToJsonFile = async (users: User []): Promise<void> => {
  await jsonfile.writeFile(DB_FILE_PATH, users);
};

export const readFromJsonFile = async (): Promise<User[]> => {
  const users: User[] = await jsonfile.readFile(DB_FILE_PATH);
  return users;
};


