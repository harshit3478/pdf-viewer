"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
// import debounce from "lodash.debounce";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";
import Loading from "./loading";

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface Props {
  book: {
    title: string;
    path: string;
    lastPageVisited: number;
  };
  isSidebar?: boolean;
  page: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

export default function PDFJS({ book, isSidebar = true, page , setCurrentPage , currentPage }: Props) {
  const [numPages, setNumPages] = useState<number>(0);
  // const [currentPage, setCurrentPage] = useState<number>(Number(page));
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const renderBuffer = 3;

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    if (currentPage > numPages) {
      setCurrentPage(numPages);
    }
  }
  console.log("currentPage ", currentPage);
  console.log("numPages ", numPages);

  // const handlePageRenderSuccess = useCallback(() => {
  //   setLoading(false);
  // }, []);

  // const updateCurrentPage = useCallback(() => {
  //   if (containerRef.current) {
  //     const { scrollTop, clientHeight } = containerRef.current;
  //     const pageHeight = containerRef.current.clientWidth / 1.5;
  //     const newPage = Math.floor(scrollTop / pageHeight) + 1;

  //     if (newPage !== currentPage) {
  //       setLoading(true);
  //       setCurrentPage(newPage);
  //     }
  //   }
  // }, [currentPage]);

  // const handleScroll = debounce(updateCurrentPage, 100);

  // useEffect(() => {
  //   const container = containerRef.current;
  //   if (container) {
  //     container.addEventListener('scroll', handleScroll);
  //   }
  //   return () => {
  //     if (container) {
  //       container.removeEventListener('scroll', handleScroll);
  //     }
  //   };
  // }, [handleScroll]);

  // useEffect(() => {
  //   const handleResize = debounce(() => {
  //     updateCurrentPage();
  //   }, 100);
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, [updateCurrentPage]);

  // detect right and left keys from hardware keyboard of device
  // avoid default behavior of browser

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        console.log("Arrowleft pressed")
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        console.log("ArrowRight pressed")
        if (currentPage < numPages) {
          setCurrentPage(currentPage + 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentPage, numPages, setCurrentPage]);

  
  
  function IncrementPage() {
    if(currentPage === numPages) return;

    setCurrentPage(currentPage + 1);
  }
  function DecrementPage() {
    if(currentPage === 1) return;
  
    setCurrentPage(currentPage - 1);
  }
  function handlePageChange(page: number) {
    if(page > numPages ) return;
    if(page < 1) setCurrentPage(1);
    setCurrentPage(page);
  }
  return (
    <>
      <div
        className={`flex-1 flex justify-center items-center ${
          isSidebar ? "w-[80vw]" : "w-[95vw]"
        } bg-transparent h-screen absolute right-0 overflow-auto`}
      >
        <Document
          file={book.path}
          onLoadSuccess={onDocumentLoadSuccess}
          className={"h-screen overflow-y-auto flex justify-center  flex-1 "}
          
        >
          <Page
            key={`page_${currentPage}`}
            className="pdf-page relative mx-20 z-0 "
            pageNumber={currentPage}
            renderTextLayer={true}
            // noData={
            //   <div className="modal modal-open flex items-center justify-center ">
            //     <div className="modal-overlay bg-slate-300"></div>
            //     <div className="bg-slate-600 p-2 rounded-sm flex items-center justify-center">
            //       <h1 className="text-3xl font-bold p-3 rounded-md ">No page Specified!!</h1>
            //     </div>
            //   </div>
            // }
            loading={
             <Loading text="loading " />
            }
            onLoad={() => setLoading(true)}
            width={800}
            
            height={800}
            onRenderSuccess={() => setLoading(false)}
          >
          <button
            className="btn btn-outline h-full  rounded-lg absolute top-0 -left-8 cursor-pointer "
            onClick={DecrementPage}
            disabled={currentPage <= 1}
          >
            <FaChevronLeft />
          </button>
           <button
            className="btn btn-outline h-full  rounded-lg absolute top-0 -right-8 cursor-pointer"
            onClick={IncrementPage}
            disabled={currentPage === numPages}
          >
            <FaChevronRight />
          </button>
            </Page>
        </Document>
      </div>
      <div className="absolute bottom-5 rounded-md left-20 bg-slate-800 text-slate-200 p-2 text-center">
        <div>
          Page 
          <input type='number' className="min-w-16 max-w-20 w-fit py-0.5 pl-5  input mx-3  border-solid border-1 border-slate-400"   value={currentPage} onChange={(e) => handlePageChange(e.target.valueAsNumber)}/> of {numPages}
        </div>
      </div>
      {loading && (
        <Loading text="Loading page" />
      )}
    </>
  );
}
