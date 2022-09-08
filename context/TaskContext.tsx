import { createContext, useContext, useState } from "react";
import {supabase} from '../lib/initSupabase'

interface TaskContextProps {
  children: React.ReactElement;
}

interface TaskProps {
  id: any;
  title: string;
  body: string;
  category: string;
  priority: string;
  status?: string;
}

interface FormikValueProps {
  taskTitle: string,
  taskBody: string,
  category: string,
  taskPriority: string
}

export const TaskContext = createContext({});

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTasks must be used within a TaskContextProvider");
  return context;
};

export const TaskContextProvider = ({ children }: TaskContextProps) => {
  const [tasks, setTasks] = useState<TaskProps[]>([]);

  const fetchTasks = async () => {
    let { data: tasks, error } = await supabase.from("tasks").select("*");
    if (error) console.log("error", error);
    else setTasks(tasks);
  };

  const addTask = async (values: FormikValueProps) => {
    const {taskTitle, taskBody, category, taskPriority} = values;
    if (values) {
      let { data: task, error } = await supabase.from("tasks").insert({
        title: taskTitle,
        body: taskBody,
        category: category,
        priority: taskPriority,
      });
      if (error) console.log(error.message);
    }
  };

  const deleteTask = async (id: TaskProps) => {
    try {
      await supabase.from("tasks").delete().eq("id", id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, addTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
