import { Task } from "@/app/page";
import React from "react";

export interface TodoItemProps {
  task: Task;
  toggleStatusTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TodoItem = ({ task, toggleStatusTask, deleteTask }: TodoItemProps) => {
  if (!task) return null;

  return (
    <li className="flex justify-between items-center p-2 border rounded">
      <div>
        <input
          type="checkbox"
          checked={task?.status === "done"}
          onChange={() => toggleStatusTask(task.id)}
          className="mr-2"
        />
        <span className={task?.status === "done" ? "line-through" : ""}>
          {task.text}
        </span>
        <span className="ml-2 text-sm text-gray-500">
          (Priority {task.priority})
        </span>
      </div>
      <button
        onClick={() => deleteTask(task.id)}
        className="text-red-500 hover:underline"
      >
        Delete
      </button>
    </li>
  );
};

export default TodoItem;
