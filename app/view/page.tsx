"use client";
import { useBookStore } from "@/store/book";
import { useParams } from "next/navigation";
import React, { useState } from "react";


export default function Page() {
    const book = useBookStore((state: any) => state.books);

  return (
      <div>
   
      <iframe
        className="h-[80vh] "
        id="inlineFrameExample"
        title="Inline Frame Example"
        width="100%"
        height="80%"
        popover="auto"
        src={`/pdfs/soil.pdf#page=${book[0].lastPageVisited}&view=fitH&toolbar=1&statusbar=1&messages=1&navpanes=0`}
        style={{
          filter: " contrast(1.0) brightness(0.9)",
          backgroundColor: "#1e1e1e",
          border: "none",
          padding: "10px",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      ></iframe>
     
    </div>
  );
}
