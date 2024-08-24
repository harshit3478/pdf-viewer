import React from "react";
import { DiTravis } from "react-icons/di";

type ModalProps = {
  children: React.ReactNode;
    // isModalOpen: boolean;
    // setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Modal({ children }: ModalProps) {

  return (
    <>
 
    {/* <label htmlFor="my-modal" className="btn modal-button">Modal</label> */}
    <input type="checkbox" id="my-modal" className="modal-toggle" /> 
    <div className="modal modal-open z-50 ">
      <div className="modal-box w-auto ">
        {children}
      </div>
    </div>

    </>
  );
}
