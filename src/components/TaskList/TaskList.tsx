import { useEffect, useRef, useState } from "react";
import { TaskProps, useTasksContext } from "../../context/TaskContext";
import TaskCol from "../TaskCol/TaskCol";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

interface StatusProps {
  id: number;
  status: string;
}

function TaskList() {
  const { tasks, fetchTasks, setTasks } = useTasksContext();

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="mt-24 grid h-full w-full grid-cols-3 place-items-start gap-3">
      <TaskCol
        tasks={tasks!.filter((task) => task.status === "requested")}
        status="Requested"
      />
      <TaskCol
        tasks={tasks!.filter((task) => task.status === "in-progress")}
        status="In Progress"
      />
      <TaskCol
        tasks={tasks!.filter((task) => task.status === "done")}
        status="Done"
      />
    </div>
  );
}

export default TaskList;
