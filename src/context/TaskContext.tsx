import { signIn, useSession } from "next-auth/react";
import { createContext, useContext, useState } from "react";
import { supabase } from "../lib/initSupabase";

interface TaskContextProps {
  children?: React.ReactElement;
  tasks?: TaskProps[] | null;
  setTasks: (tasks: any) => void;
  fetchTasks: (tasks?: TaskProps[]) => void;
  addTask: (values: FormikValueProps) => void;
  deleteTask: (id: TaskProps) => void;
  updateTask: (tasks: TaskProps[]) => void;
  handleOAuthSignIn: (provider: string) => () => void;
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

export const useTasksContext = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTasks must be used within a TaskContextProvider");
  return context;
};

export const TaskContextProvider = ({ children }: TaskContextProps) => {
  const [tasks, setTasks] = useState<TaskProps[] | null | undefined>([]);
  const { data: session, status } = useSession();

  const handleOAuthSignIn = (provider: string) => () => {
    signIn(provider, { callbackUrl: "/" });
  };

  const fetchTasks = async () => {
    const user_email = session?.user?.email;
    let { data, error } = await supabase
      .from("tasks")
      .select()
      .eq("user_email", user_email);
    if (error) console.log("error", error);
    else setTasks(data);
  };

  const addTask = async (values: FormikValueProps) => {
    const { taskTitle, taskBody, category, taskPriority } = values;
    if (values) {
      let { data, error } = await supabase.from("tasks").insert({
        title: taskTitle,
        body: taskBody,
        category: category,
        priority: taskPriority,
        user_email: session?.user?.email,
      });
      fetchTasks();
      if (error) console.log(error.message);
    }
  };

  const deleteTask = async (id: TaskProps) => {
    const { data, error } = await supabase.from("tasks").delete().eq("id", id);
    setTasks(tasks!.filter((task) => task.id !== id));
    console.log(id)
  };

  const updateTask = async (tasks: TaskProps[]) => {
    const { data, error } = await supabase.from("tasks").update(tasks);
    fetchTasks();
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        fetchTasks,
        addTask,
        setTasks,
        deleteTask,
        updateTask,
        handleOAuthSignIn,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
