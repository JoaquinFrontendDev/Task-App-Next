import { useDrag } from "react-dnd";
import { TaskProps } from "../../context/TaskContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { useTasks } from "../../context/TaskContext";

function Task({ id, title, body, category, priority, status }: TaskProps) {
  const { deleteTask } = useTasks();

  const handleDelete = () => {
    deleteTask(id)
  }

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "Task",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
    <div
      ref={drag}
      className={`relative flex h-full w-full max-w-xs flex-col justify-between rounded-sm border border-t-8 p-5 shadow-xl ${
        priority === "High"
          ? "border-t-red-500"
          : priority === "Medium"
          ? "border-t-yellow-500"
          : "border-t-blue-500"
      }`}
    >
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-6 text-sm">{body}</p>
      <div className="flex items-end justify-between">
        <div
          className={`mt-8 rounded-full border-2 py-[2px] px-3 capitalize ${
            category === "personal"
              ? "border-green-500 text-green-500"
              : "border-pink-500 text-pink-500"
          }`}
        >
          {category}
        </div>
        <div
          className={`text-[10px] ${
            priority === "High"
              ? "text-red-500"
              : priority === "Medium"
              ? "text-yellow-500"
              : "text-blue-500"
          }`}
        >{`${priority} priority`}</div>
      </div>
      <button onClick={handleDelete}>
        <FaRegTrashAlt className="absolute right-2 top-2 text-gray-400" />
      </button>
    </div>
  );
}

export default Task;
