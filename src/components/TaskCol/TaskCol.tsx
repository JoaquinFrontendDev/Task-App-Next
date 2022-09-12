interface TaskColProps {
  children: React.ReactNode[];
  status: string;
}

function TaskCol({ children, status }: TaskColProps) {
  return (
    <div className="flex min-h-full w-full flex-col items-center overflow-y-auto border-2 border-gray-200">
      <div className="w-full py-4 text-center text-lg font-semibold bg-blue-600 text-white">
        {status}
      </div>
      <div className='my-2'>{children}</div>
    </div>
  );
}

export default TaskCol;
