import {useSession} from "next-auth/react";
import { createContext, useContext, useState } from "react";
import { supabase } from "../lib/initSupabase";

interface TaskContextProps {
  children?: React.ReactElement;
  tasks?: TaskProps[] | null;
  fetchTasks: (tasks?: TaskProps[]) => void;
  addTask: (values: FormikValueProps) => void;
  deleteTask: (id: TaskProps) => void;
}

export interface TaskProps {
  id: any;
  title: string;
  body: string;
  category: string;
  priority: string;
  status?: string;
}

interface FormikValueProps {
  taskTitle: string;
  taskBody: string;
  category: string;
  taskPriority: string;
}

export const TaskContext = createContext<TaskContextProps | null>(null);



export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context)
  throw new Error("useTasks must be used within a TaskContextProvider");
  return context;
};

export const TaskContextProvider = ({ children }: TaskContextProps) => {
  const [tasks, setTasks] = useState<TaskProps[] | null | undefined>([]);
  const { data: thirdPartysession, status } = useSession();

  const fetchTasks = async () => {
    const user_email = thirdPartysession?.user?.email;
    let { data, error } = await supabase.from("tasks").select().eq('user_email', user_email);
    if (error) console.log("error", error);
    else setTasks(data);
  };

  const addTask = async (values: FormikValueProps) => {
    const { taskTitle, taskBody, category, taskPriority } = values;
    if (values) {
      let { data, error } = await supabase.from("tasks").insert({
        task_title: taskTitle,
        task_body: taskBody,
        task_category: category,
        task_priority: taskPriority,
        user_email: thirdPartysession!.user!.email,
      });
      if (error) console.log(error.message);
    }
  };

  const deleteTask = async (id: TaskProps) => {
    try {
      await supabase.from("tasks").delete().eq("id", id);
      setTasks(tasks!.filter((task) => task.id !== id));
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, fetchTasks, addTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
