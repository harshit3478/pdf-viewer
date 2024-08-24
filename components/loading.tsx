import React from 'react'
import Modal from './modal'

export default function Loading({text , size = 50} : {text?: string, size?: number}) {
  return (
    <Modal>
        <div className='flex flex-col gap-4 justify-center items-center'>
        <p>{text}</p>
        <span className={`loading loading-spinner text-success loading-lg w-[${size} h-[${size}]`}></span>
        </div>
    </Modal>


  )
}
