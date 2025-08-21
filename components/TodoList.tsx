import { Task } from "@/app/page";
import React from "react";
import TodoItem from "./TodoItem";

interface TodoListProps {
  tasks: Task[];
  toggleStatusTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TodoList = ({ tasks, toggleStatusTask, deleteTask }: TodoListProps) => {
  return (
    <ul className="space-y-2">
      {tasks.length > 0 ? (
        tasks.map((t) => (
          <TodoItem
            key={t.id}
            task={t}
            toggleStatusTask={toggleStatusTask}
            deleteTask={deleteTask}
          />
        ))
      ) : (
        <li className="text-gray-500">No tasks available</li>
      )}
    </ul>
  );
};

export default TodoList;
