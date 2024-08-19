"use client";
import React from 'react'

interface Props {
    book: {
        title : string,
        path : string,
        lastPageVisited : number
    },
    isSidebar? : boolean,
    page : number
}
export default function ViewPdf({book  , isSidebar=true , page}: Props) {
  console.log('book', book)
  console.log(book.path, '#page=', book.lastPageVisited, '&view=fill&toolbar=1&statusbar=1&messages=1&navpanes=0')
  return (
    <div className={` flex-1 ${isSidebar ? 'w-[80vw]' : 'w-[95vw]'} h-screen  absolute right-0`}>
      <p>book is : </p>
        <iframe
        id="inlineFrameExample"
        title="Inline Frame Example"
        popover="auto"
        src={`${book.path}#page=${page}&view=fitH&toolbar=1&statusbar=1&messages=1&navpanes=0`}
        style={{
            filter: ' contrast(1.0) brightness(0.9)',
            backgroundColor: '#1e1e1e',
            border: 'none',
            padding: '10px',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          }}
        className='w-full h-full absolute right-0'
      ></iframe>
    </div>
  )
}
