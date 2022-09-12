import { useFormik } from "formik";
import { useTasksContext} from "../../context/TaskContext";

interface CreateTaskModalProps {
  closeModal: () => void;
}

function CreateTaskModal({ closeModal }: CreateTaskModalProps) {
  const priorities = ["High", "Medium", "Low"];

  const { addTask } = useTasksContext();

  const formik = useFormik({
    initialValues: {
      category: "",
      taskTitle: "",
      taskBody: "",
      taskPriority: "",
    },
    onSubmit: () => {
      addTask(formik.values);
      closeModal()
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="flex w-full flex-col">
        <div className="mb-[23px] flex gap-2">
          <div className="flex w-full flex-col items-center justify-center rounded-lg border-2 border-green-500 bg-green-200 py-4">
            <input
              type="radio"
              name="category"
              id="category"
              value="personal"
              onChange={formik.handleChange}
              className="cursor-pointer border-2 border-green-500 text-green-500 focus:ring-1 focus:ring-green-500"
            />
            <h3 className="mt-2 font-semibold">Personal</h3>
          </div>
          <div className="flex w-full flex-col items-center justify-center rounded-lg border-2 border-pink-500 bg-pink-200 py-4">
            <input
              type="radio"
              name="category"
              id="category"
              value="business"
              onChange={formik.handleChange}
              className="cursor-pointer border-2 border-pink-500 text-pink-500 focus:ring-1 focus:ring-pink-500"
            />
            <h3 className=" mt-2 font-semibold">Business</h3>
          </div>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-sm">Title</label>
          <input
            type="text"
            name="taskTitle"
            id="taskTitle"
            className="rounded-lg border-gray-300 font-semibold shadow-sm placeholder:font-normal placeholder:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Write a title"
            onChange={formik.handleChange}
          />
        </div>
        <div className="mt-3 flex flex-col">
          <label className="mb-1 text-sm">Main body</label>
          <textarea
            name="taskBody"
            id="taskBody"
            rows={4}
            className="resize-none overflow-y-auto rounded-lg border-gray-300 font-semibold shadow-sm placeholder:font-normal placeholder:text-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Write a body..."
            onChange={formik.handleChange}
          />
        </div>
        <div className="mt-3 flex flex-col">
          <label className="mb-1 text-sm">Choose priority</label>
          <select
            name="taskPriority"
            id="taskPriority"
            value={formik.values.taskPriority}
            onChange={formik.handleChange}
            className={`rounded-lg border-gray-300 font-semibold shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${
              formik.values.taskPriority === "High"
                ? "text-red-500"
                : formik.values.taskPriority === "Medium"
                ? "text-yellow-500"
                : formik.values.taskPriority === "Low"
                ? "text-blue-500"
                : ""
            }`}
          >
            <option value="">Select your priority</option>
            {priorities.map((priority, index) => (
              <option
                className={`font-semibold ${
                  priority === "High"
                    ? "text-red-500"
                    : priority === "Medium"
                    ? "text-yellow-500"
                    : priority === "Low"
                    ? "text-blue-500"
                    : ""
                }`}
                key={index}
              >
                {priority}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-[23px] flex items-center justify-end gap-5">
          <button
            onClick={closeModal}
            className="rounded-lg border-2 border-indigo-500 px-3 py-1.5 text-indigo-500"
          >
            Close
          </button>
          <button
            type="submit"
            className="rounded-lg border-2 border-transparent bg-indigo-500 px-3 py-1.5 text-white hover:bg-indigo-600"
          >
            Create
          </button>
        </div>
      </div>
    </form>
  );
}

export default CreateTaskModal;
