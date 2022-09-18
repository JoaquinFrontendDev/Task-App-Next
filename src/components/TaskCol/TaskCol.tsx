import { TaskProps } from "../../context/TaskContext";
import Task from "../Task/Task";

interface TaskColProps {
  tasks: TaskProps[];
  status: string;
}

function TaskCol({ tasks, status }: TaskColProps) {
  return (
    <div className='max-w-md w-full flex flex-col items-center justify-start'>
      <div className="w-full bg-blue-600 py-4 text-center text-lg font-semibold text-white">
        {status}
      </div>
      <div className="flex min-h-full w-full flex-col items-center overflow-y-auto border-2 border-gray-200">
        <div className="my-3 flex w-full flex-col items-center gap-3 px-2">
          {tasks!.map((task: TaskProps) => (
            <Task
              key={task.id}
              id={task.id}
              title={task.title}
              body={task.body}
              category={task.category}
              priority={task.priority}
              status={task.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TaskCol;
