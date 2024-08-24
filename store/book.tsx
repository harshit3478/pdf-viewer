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
                    // console.log("book added ", book);
                    // add the book and reverse the order
                    return { books: [book, ...state.books] };
                }
                return state;
            }),
            deleteBook: (book: Book) => set((state) => ({
                books: state.books.filter((b: Book) => b.title !== book.title)
            })),
            updateBook: (payload: Payload) => set((state) => {
                // find the book and slice it and add the updated book in front

                const bookIndex = state.books.findIndex((book: Book) => book.title === payload.title);
                const book = state.books[bookIndex];
                const updatedBook = { ...book, lastPageVisited: payload.lastPageVisited };
                state.books.splice(bookIndex, 1);
                return { books: [updatedBook, ...state.books] };
            })
        }),
        {
            name: 'book-storage',
        }
    )
);