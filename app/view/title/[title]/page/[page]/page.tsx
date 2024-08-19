"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useBookStore } from "@/store/book";

import Sidebar from "@/components/sidebar";
import { url } from "inspector";
import { setuid } from "process";

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
  // when the book is not found, redirect to the home page
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
  
  if (!book) {
    return null;
  }
  return (
    <div>
      <Sidebar book={book} page={page} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </div>
  );
}
