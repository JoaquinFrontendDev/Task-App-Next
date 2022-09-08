import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { BsXLg } from "react-icons/bs";

interface ReusableModalProps {
  title: string;
  description?: string;
  children: React.ReactChild | React.ReactChild[];
  isOpen: boolean;
  closeModal(): void;
}

function ReusableModal({
  title,
  description,
  children,
  isOpen,
  closeModal,
}: ReusableModalProps) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="flex min-h-screen items-center justify-center px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Backdrop className="fixed inset-0 bg-black/20 backdrop-blur-[7px]" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mobile-l:p-[23px] shadow-product-card relative inline-block w-full max-w-[535px] transform overflow-hidden rounded-lg bg-white p-[30px] text-left transition-all">
              <BsXLg
                onClick={closeModal}
                className="absolute right-[17px] top-[17px] cursor-pointer text-[12px]"
              />
              <Dialog.Title
                as="h1"
                className="text-3xl font-bold text-indigo-500"
              >
                {title}
              </Dialog.Title>
              {description && (
                <Dialog.Description className="mt-[23px] text-[14px] text-gray-900 font-semibold">
                  {description}
                </Dialog.Description>
              )}
              <div className="mt-[13px]">{children}</div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default ReusableModal;
