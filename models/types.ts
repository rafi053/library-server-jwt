export interface User {
    userName: string;
    password: string;
    id?: string;
    books: Book[];
  }
  
  export interface Book {
    id?: string;
    title: string;
    author?: string;
  }
  
  export interface userNamePassword {
    userName: string;
    password: string;
  }
  