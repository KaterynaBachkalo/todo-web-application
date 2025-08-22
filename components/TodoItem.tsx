import { Task } from "@/app/page";
import { Trash2 } from "lucide-react";
import React from "react";

export interface TodoItemProps {
  task: Task;
  toggleStatusTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TodoItem = ({ task, toggleStatusTask, deleteTask }: TodoItemProps) => {
  return (
    <li className="flex justify-between items-center p-2 border rounded">
      <div>
        <input
          type="checkbox"
          checked={task?.status === "done"}
          onChange={() => toggleStatusTask(task.id)}
          className="mr-2 cursor-pointer"
        />
        <span className={task?.status === "done" ? "line-through" : ""}>
          {task.text}
        </span>
        <span className="ml-2 text-sm text-gray-500">
          (Priority {task.priority})
        </span>
      </div>
      <Trash2
        className="stroke-red-500 cursor-pointer"
        onClick={() => deleteTask(task.id)}
      />
    </li>
  );
};

export default TodoItem;
