import type { FC } from "react";

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';

interface WinnerModalProps {
  isOpen: boolean;
  handleClose: () => void;
  handleResetGame: () => void;
}

const WinnerModal:FC<WinnerModalProps> = ({ isOpen, handleClose, handleResetGame }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-dark bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="winner-modal w-full max-w-md transform overflow-hidden rounded-[10px] bg-light py-4 px-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="flex justify-end">
                  asasas
                </Dialog.Title>
                <div className="h-52 winner-modal__img flex items-center justify-center -mt-5">
                  <h3 className='text-3xl font-bold tracking-wide text-dark select-none'>
                    Bạn đã chiến thắng
                  </h3>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default WinnerModal;
