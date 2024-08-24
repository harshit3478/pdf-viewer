import React from "react";
import { useBookStore } from "@/store/book";
import { useRouter } from "next/navigation";
import { MdDeleteOutline } from "react-icons/md";
import Modal from "./modal";
import Loading from "./loading";
import Toast from "./toast";

export default function BookList({ bookTitle }: any) {
  const router = useRouter();
  const books = useBookStore((state: any) => state.books);
  const [isDeleteModal, setIsDeleteModal] = React.useState(false);
  const [deleteBook, setDeleteBook] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(false);
  const [showSuccessToast, setShowSuccessToast] = React.useState(false);
    const [showErrorToast, setShowErrorToast] = React.useState(false);
  function handleClick(book: any) {
    console.log("book", book);
    router.push(
      `/view/title/${encodeURIComponent(book.title)}/page/${
        book.lastPageVisited
      }`
    );
  }
  async function handleDeleteClick(book: any) {
    setIsDeleteModal(true);
    setDeleteBook(book);
    console.log("book to be deleted", deleteBook);
  }
  async function handleDelete() {
    console.log("yes clicked");
    setIsDeleteModal(false);
    setLoading(true);
    try {
        console.log("book deleted from zustand is ", deleteBook);
        const fileName = deleteBook.path.split(".com/")[1] 
        console.log("fileName ", fileName);
        const response = await fetch(`/apis/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fileName: fileName,
            }),
        });
        const result = await response.json();
        console.log("result of delete api response ", result);
        if (result.success) {
            setLoading(false);
            setIsDeleteModal(false);
            setShowSuccessToast(true);
            setTimeout(() => {
            setShowSuccessToast(false);
            }, 5000);
            useBookStore.getState().deleteBook(deleteBook);
        } else {
            setLoading(false);
            setIsDeleteModal(false);
            setShowErrorToast(true);
            setTimeout(() => {
            setShowErrorToast(false);
            }, 5000);
        }
    } catch (error) {
      setLoading(false);
      console.log("error deleting file", error);
      alert("Error deleting file");
    } finally {
      setLoading(false);
      router.push("/");
    }

    setIsDeleteModal(false);
  }
  return (
    <>
      <ul className="menu bg-base-200 text-base-content min-h-full py-4">
        {/* Sidebar content here */}
        {books.map((book: any, index: number) => (
          <li key={index} className="menu-title cursor-pointer">
            <div className=" bg-slate-900 text-slate-50 p-5 w-full flex items-center gap-2 justify-between ">
              <div
                onClick={() => handleClick(book)}
                className=" hover:bg-slate-800 p-2 px-4 rounded-md "
              >

                <p className="text-wrap">
                    {/* // first 15 characters of the title */}
                   {index+1}.  {book.title.length > 40 ? `${book.title.slice(0, 25)}...` : book.title}
                    </p>
                <p className="text-slate-400 text-start">
                  Last page visited: {book.lastPageVisited}
                </p>
              </div>
              <button
                className="btn btn-outline hover:bg-slate-800 hover:text-slate-300 border-none p-0 "
                onClick={() => handleDeleteClick(book)}
              >
                <MdDeleteOutline size={30} />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {isDeleteModal && (
        <Modal>
          <div className="flex flex-col gap-5  ">
            <h1>Are you sure you want to delete this book?</h1>
            <div className="flex gap-2 self-end">
              <button
                className="btn btn-secondary cursor-pointer"
                onClick={() => handleDelete()}
              >
                Yes
              </button>
              <button
                className="btn btn-outline"
                onClick={() => {
                  setIsDeleteModal(false);
                  setDeleteBook(null);
                }}
              >
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
      {loading && <Loading text="Deleting book" />}
      {showSuccessToast && <Toast text="Book deleted successfully" />}
        {showErrorToast && <Toast text="Error deleting book" />}
    </>
  );
}
