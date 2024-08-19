"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { MdCloudUpload } from "react-icons/md";
import { AiTwotoneCloseCircle } from "react-icons/ai"
import { useBookStore } from "@/store/book";
import { useRouter } from "next/navigation";

export default function Upload() {
  const { handleSubmit, register } = useForm();
  const [isFiles, setIsFiles] = React.useState<FileList | null>(null);
  const books = useBookStore((state: any) => state.books);
  const addBook = useBookStore((state: any) => state.addBook);

  const router = useRouter();
  React.useEffect(() => {
    console.log("books after updating ", books);
  }, [books]);

  async function onSubmit() {
    if (!isFiles) return;
    
    const formData = new FormData();
    Array.from(isFiles).forEach((file) => {
      formData.append("file", file);
    });

    const response = await fetch("/apis/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    console.log('result of upload api response ' ,result);

    if (result.success) {
      // addBook(result.uploadedFiles);      
      result.uploadedFiles.forEach((file: any) => {
        addBook({title : file.fileName.split('-')[1] ,path : file.fileUrl , lastPageVisited : 1 , id : file.fileName.split('-')[0] });
      });
      alert("File uploaded successfully");
      setIsFiles(null);
    } else {
      alert("Error uploading file");
    }
  }

  return (
    <div className="flex-1 flex justify-center items-center m-10 p-10 overflow-auto border-slate-100 border ">
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className=" flex gap-10 flex-col w-1/2 m-auto">
        <label htmlFor="file" className="btn btn-outline flex items-center">
          <MdCloudUpload size={30} /> Upload
          <input
            {...register("file", {
              required: "this field is required ",
            })}
            id="file"
            type="file"
            //pdf only
            accept="application/pdf"
            multiple
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIsFiles(e.target.files)}
            className="hidden"
          />
        </label>
        {isFiles && (
          <div className="flex flex-wrap gap-3">
            {Array.from(isFiles).map((file) => (
              <div key={file.name} className="card border border-slate-500 rounded-none px-2 py-1 bg-slate-700 m-2 relative">
                <button
                  onClick={() => {
                    setIsFiles((prevFiles) => {
                      if (!prevFiles) return null;
                      const dataTransfer = new DataTransfer();
                      Array.from(prevFiles).filter(f => f.name !== file.name).forEach(f => dataTransfer.items.add(f));
                      return dataTransfer.files.length ? dataTransfer.files : null;
                    });
                  }}
                  className="absolute -top-3 -right-3 text-white "
                >
                  <AiTwotoneCloseCircle size={30} />
                </button>
                <p>{file.name}</p>
                <p>{(file.size / 1000).toFixed(2)} KB</p>
              </div>
            ))}
          </div>
        )}
        <button type="submit" className="btn btn-outline w-full">
          Submit
        </button>
      </form>
    </div>
  );
}

{
  /* {isFiles && (
  <div>
    {Array.from(isFiles).map((file) => (
      <div className="modal modal-open" role="dialog" key={file.name}>
        <div className="modal-box relative rounded-md bg-white w-[300] h-[200] py-8 px-10 text-black gap-5 flex flex-col items-center justify-center">
          <button
            className="modal-close absolute top-2 right-4 scale-150"
            onClick={(e) => console.log("hello ")}
          >
            X
          </button>
          <div className="modal-action">
            <label htmlFor="my_modal_6" className="btn">
              Close!
            </label>
          </div>
          <p>{file.name}</p>
          <p>{file.size / 1000} KB</p>
          <label className="input input-bordered flex items-center gap-5  bg-white border-slate-500 focus-within:border focus-within:border-slate-700">
            Set Title
            <input
              type="text"
              className="grow border-l border-black pl-2 "
              placeholder="New Title"
            />
          </label>
          <button className="btn btn-outline bg-white">Save Title</button>
        </div>
      </div>
    ))}
  </div>
)} */
}
