import { useSession } from "next-auth/react";
import Image from "next/image";
import { HiPlus } from "react-icons/hi";
import { useModal } from "../../hooks/useModal/useModal";
import {supabase} from "../../lib/initSupabase";
import CreateTaskModal from "../CreateTaskModal/CreateTaskModal";
import ReusableModal from "../CreateTaskModal/ReusableModal";

function Header() {
  const session = supabase.auth.session()
  console.log(session)
  const [
    isOpenCreateTaskModal,
    setIsOpenCreateTaskModal,
    closeCreateTaskModal,
  ] = useModal();
  const { data: thirdPartySession } = useSession();

  return (
    <div className="mt-24 flex w-full items-center justify-between">
      <div className="flex items-center">
        <h1 className="text-4xl font-semibold text-gray-900">
          Welcome back,{" "}
          <span className="text-4xl font-semibold text-indigo-500">
            {thirdPartySession ? thirdPartySession?.user?.name : session?.user?.email}
          </span>
        </h1>

        <div className="mx-4">
          {thirdPartySession ? <Image
            src={thirdPartySession?.user?.image!}
            width={40}
            height={40}
            alt="user-avatar"
            className="rounded-full"
          /> : <div>No Pic</div>}

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
