
import React from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import BookList from './bookList';

type DrawerProps = {
  children: React.ReactNode;
  Drawer: boolean;
  SetDrawer: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function Drawer({children , Drawer , SetDrawer} : DrawerProps) {

  
  return (
    <>
     <div className="drawer">
          <input id="my-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content flex flex-col justify-start w-screen h-screen">
            <div className="">
              <label
                htmlFor="my-drawer"
                onClick={() => SetDrawer(true)}
                className=" m-3 btn btn-outlined drawer-button self-start align-top "
              >
                {Drawer ? (
                  <FiChevronLeft size={30} />
                ) : (
                  <FiChevronRight size={30} />
                )}
              </label>
            </div>
            {children}
          </div>
          <div className="drawer-side">
            <label
              htmlFor="my-drawer"
              aria-label="close sidebar"
              className="drawer-overlay"
              onClick={() => SetDrawer(false)}
            ></label>

            <BookList />
          </div>
        </div>
    </>
  )
}
