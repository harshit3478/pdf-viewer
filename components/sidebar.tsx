"use client";
import React from "react";
import ViewPdf from "./ViewPdf";

import { useBookStore } from "@/store/book";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRouter } from "next/navigation";
import PDFJS from "./pdfJS";
import { MdDeleteOutline } from "react-icons/md";
export default function Sidebar({
  book,
  page,
  setCurrentPage,
  currentPage,
}: any) {
  const router = useRouter();
  const books = useBookStore((state: any) => state.books);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  // console.log("isDrawerOpen", isDrawerOpen);
  function handleClick(book: any) {
    console.log("book", book);
    router.push(
      `/view/title/${encodeURIComponent(book.title)}/page/${
        book.lastPageVisited
      }`
    );
  }

  async function handleDelete(book: any) {
     useBookStore.getState().deleteBook(book);
  }
  return (
    <>
      <div>
        <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex w-screen h-screen">
            <div className="">
              <label
                htmlFor="my-drawer"
                onClick={() => setIsDrawerOpen(true)}
                className=" m-3 btn btn-outlined drawer-button "
              >
                {isDrawerOpen ? (
                  <FiChevronLeft size={30} />
                ) : (
                  <FiChevronRight size={30} />
                )}
              </label>
            </div>
            {/* <ViewPdf book={book} page={page} isSidebar={isDrawerOpen} /> */}
            <PDFJS
              book={book}
              page={page}
              isSidebar={isDrawerOpen}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
              onClick={() => setIsDrawerOpen(false)}
            ></label>

            <ul className="menu bg-base-200 text-base-content min-h-full w-80 overflow-x-auto   py-4">
              {/* Sidebar content here */}
              {books.map((book: any, index: number) => (
                <li
                  key={index}
                  className="menu-title cursor-pointer "
                  onClick={() => handleClick(book)}
                >
                  <div className=" border-slate-100 border text-slate-50 p-5 hover:bg-slate-600 w-full flex items-center gap-2 justify-between ">
                    <div>
                      <p>
                        {index + 1}. {book.title}
                      </p>
                      <p className="text-slate-400 text-start">
                        Last page visited: {book.lastPageVisited}
                      </p>
                    </div>
                    <button className="btn btn-outline border-none p-0 " onClick={()=>handleDelete(book)}>
                      <MdDeleteOutline size={30} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
