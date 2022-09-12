import Task from "../Task/Task";
import { useDrop } from "react-dnd";
import { useEffect } from "react";
import { TaskProps, useTasksContext } from "../../context/TaskContext";
import TaskCol from "../TaskCol/TaskCol";

interface StatusProps {
  id: number,
  status: string
}

function TaskList() {
  const { tasks, fetchTasks } = useTasksContext();

  useEffect(() => {
    fetchTasks();
  }, [tasks, fetchTasks]);

  // const [{ isOver }, drop] = useDrop(() => ({
  //   accept: "Task",
  //   drop: (item: any) => moveTask(item.id),
  //   collect: (monitor) => ({
  //     isOver: !!monitor.isOver(),
  //   }),
  // }));

  // const moveTask = (id: number) => {
  //   setTasks(tasks.filter((tasks) => tasks.id !== id));
  // };

  return (
    <>
      <div className="mt-24 grid h-full w-full grid-cols-3 place-items-center gap-3">
          <TaskCol status="Requested">
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
          </TaskCol>
          <TaskCol status="In Progress">
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
          </TaskCol>
          <TaskCol status="Done">
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
          </TaskCol>
      </div>
    </>
  );
}

export default TaskList;
