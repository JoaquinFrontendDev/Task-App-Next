import { useSession } from "next-auth/react";
import Image from "next/image";
import { HiPlus } from "react-icons/hi";
import { useModal } from "../../hooks/useModal/useModal";
import CreateTaskModal from "../CreateTaskModal/CreateTaskModal";
import ReusableModal from "../CreateTaskModal/ReusableModal";

function Header() {
  const [
    isOpenCreateTaskModal,
    setIsOpenCreateTaskModal,
    closeCreateTaskModal,
  ] = useModal();
  const { data: session } = useSession();
  console.log(session)

  return (
    <div className="mt-24 flex w-full items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-4xl font-semibold text-gray-900">
          Welcome back,{" "}
          <span className="text-4xl font-semibold text-indigo-500">
            {session?.user?.name}
          </span>
        </h1>

        <div className="mx-4">
          <Image
            src={session?.user?.image!}
            width={40}
            height={40}
            alt="user-avatar"
            className="rounded-full"
          />
        </div>
      </div>
      <div>
        <button
          onClick={setIsOpenCreateTaskModal}
          className="flex items-center gap-2 rounded-full bg-indigo-500 px-3 py-2 font-semibold text-white transition hover:bg-indigo-600"
        >
          <HiPlus className="text-2xl" />
          <span>Add Task</span>
        </button>
      </div>
      <ReusableModal
        title="Let's create a task!"
        description="Pick a category"
        isOpen={isOpenCreateTaskModal}
        closeModal={closeCreateTaskModal}
      >
        <CreateTaskModal closeModal={closeCreateTaskModal} />
      </ReusableModal>
    </div>
  );
}

export default Header;
