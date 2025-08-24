import { Task } from "@/app/page";
import React from "react";
import TodoItem from "./TodoItem";
import LoaderComponent from "@/components/LoaderComponent";
import Image from "next/image";

interface TodoListProps {
  tasks: Task[];
  toggleStatusTask: (id: number) => void;
  deleteTask: (id: number) => void;
  loading: boolean;
}

const TodoList = ({
  tasks,
  toggleStatusTask,
  deleteTask,
  loading,
}: TodoListProps) => {
  return (
    <>
      {loading && <LoaderComponent />}

      <ul className="space-y-4">
        {!loading &&
          tasks?.length > 0 &&
          tasks.map((t) => (
            <TodoItem
              key={t.id}
              task={t}
              toggleStatusTask={toggleStatusTask}
              deleteTask={deleteTask}
            />
          ))}
        {!loading && tasks?.length === 0 && (
          <Image
            src="no-tasks.png"
            alt="No tasks"
            width={200}
            height={200}
            className="mx-auto mt-10 opacity-50"
          />
        )}
      </ul>
    </>
  );
};

export default TodoList;
