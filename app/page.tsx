"use client"
import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRouter } from "next/navigation";


import { useBookStore } from "@/store/book";
import Sidbar from "@/components/sidebar";
import ViewPdf from "@/components/ViewPdf";
import Upload from "@/components/upload";

export default function Home() {
  const router = useRouter();
  const books = useBookStore((state: any) => state.books);
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  console.log("isDrawerOpen", isDrawerOpen);
  function handleClick(book: any) {
    console.log("book", book);
    router.push(
      `/view/title/${encodeURIComponent(book.title)}/page/${
        book.lastPageVisited
      }`
    );
  }

  return <main className="flex-1">
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
            <Upload />
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
              onClick={() => setIsDrawerOpen(false)}
            ></label>

            <ul className="menu bg-base-200 text-base-content min-h-full w-80 py-4">
              {/* Sidebar content here */}
              {books.reverse().map((book: any, index: number) => (
                <li
                  key={index}
                  className="menu-title cursor-pointer"
                  onClick={() => handleClick(book)}
                >
                  <div className="card border-slate-100 border text-slate-50 p-5 hover:bg-slate-600 w-full">
                    {index + 1}. {book.title}
                    <p className="text-slate-400 text-start">Last page visited: {book.lastPageVisited}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
  </main>;
}

