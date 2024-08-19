import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Book = {
    title: string;
    path: string;
    lastPageVisited: number;
    id : string;
};

type Payload = {
    title: string;
    lastPageVisited: number;
};

type BookStore = {
    books: Book[];
    addBook: (book: Book) => void;
    deleteBook: (book: Book) => void;
    updateBook: (payload: Payload) => void;
};

export const useBookStore = create(
    persist<BookStore>(
        (set, get) => ({
            books: [
                {
                    title: "Atterberg Limits",
                    path: "https://mypdfreaderbucket.s3.ap-south-1.amazonaws.com/1724087667191-Atterberg+Limits+(1).pdf",
                    lastPageVisited: 1,
                    id: "1"
                }
            ],
            addBook: (book: Book) => set((state) => {
                const bookExists = state.books.some(b => b.title === book.title);
                if (!bookExists) {
                    return { books: [...state.books, book] };
                }
                return state;
            }),
            deleteBook: (book: Book) => set((state) => ({
                books: state.books.filter((b: Book) => b.title !== book.title)
            })),
            updateBook: (payload: Payload) => set((state) => {
                const updatedBooks = state.books.map(book => 
                    book.title === payload.title 
                        ? { ...book, lastPageVisited: payload.lastPageVisited }
                        : book
                );
                return { books: updatedBooks };
            })
        }),
        {
            name: 'book-storage',
        }
    )
);