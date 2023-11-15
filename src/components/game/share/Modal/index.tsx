import type { FC } from 'react';

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface ModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  okLabel?: string;
  okColor?: 'primary' | 'error';
  cancelLabel?: string;
  handleConfirm?: () => void;
  handleClose: () => void;
}

const Modal:FC<ModalProps> = ({ isOpen, title, content, okLabel, okColor, cancelLabel, handleConfirm, handleClose }) => {
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
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-light p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg leading-6 text-dark font-bold"
                >
                  {title}
                </Dialog.Title>
                <div className="my-6">
                  <p className="text-sm text-darkLight">
                    {content}
                  </p>
                </div>

                <div className="flex justify-end">
                  {
                    handleConfirm &&
                    <button
                      type='button'
                      className={`mr-2 ${okColor ? `tw-${okColor}-btn` : 'tw-primary-btn'}`}
                      style={{ background: '#ccc', padding: '4px', marginTop: '16px', marginRight: '8px'}}
                      onClick={handleConfirm}
                    >
                      {okLabel || 'Xác Nhận'}
                    </button>
                  }
                  <button
                    type="button"
                    className="tw-flat-btn"
                    style={{ background: '#ccc', padding: '4px', marginTop: '16px'}}
                    onClick={handleClose}
                  >
                    {cancelLabel || 'Hủy'}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal;
