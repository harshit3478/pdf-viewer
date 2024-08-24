"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import { useBookStore } from "@/store/book";
import Drawer from "@/components/drawer";
import PDFJS from "@/components/pdfJS";

type Book = {
  title: string;
  path: string;
  lastPageVisited: number;
};

export default function Page() {
  const { page , title } = useParams();
  const [currentPage, setCurrentPage] = useState<number>(Number(page));
  const {updateBook } = useBookStore();
  const books = useBookStore((state: any) => state.books);
  const book = books.find((book:Book) => book.title === decodeURIComponent(title.toString()));
  const router = useRouter()
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  // change the url when page no changes 
  useEffect(() => {
    if (currentPage !== Number(page)) {
      // replace the url dynamically
      window.history.replaceState({}, "", `/view/title/${title}/page/${currentPage}`);
    }
    updateBook({ title: book.title, lastPageVisited: currentPage });
    return () => {
      // cleanup
    }
    
  }, [currentPage , page]);
  
  // when the book is not found, redirect to the home page
  if (!book) {
    router.push("/");
    return null;
  }

  return (
    <div>
      <Drawer Drawer={isDrawerOpen} SetDrawer={setIsDrawerOpen} >
      <PDFJS
              book={book}
              page={currentPage}
              isSidebar={isDrawerOpen}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
            <button className="btn btn-link bg-red z-50 absolute top-5 right-5" onClick={() => router.push("/")}  >Home</button>
        </Drawer>
    </div>
  );
}
