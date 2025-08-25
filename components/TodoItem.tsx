"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { Task } from "./types";
import { Trash2 } from "lucide-react";
import React from "react";

export interface TodoItemProps {
  task: Task;
  toggleStatusTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TodoItem = ({ task, toggleStatusTask, deleteTask }: TodoItemProps) => {
  return (
    <li>
      <Label className="hover:bg-[#f7fee780] shadow-lg hover:shadow-lime-200 shadow-lime-100  items-center gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-lime-600 has-[[aria-checked=true]]:bg-lime-100 md:p-3 2xl:p-4 w-full">
        <span className="transition-transform hover:scale-150">
          <Checkbox
            id="toggle-2"
            onCheckedChange={() => toggleStatusTask(task.id)}
            checked={task?.status === "done"}
            className="data-[state=checked]:border-lime-600 cursor-pointer data-[state=checked]:bg-lime-600 data-[state=checked]:text-white dark:data-[state=checked]:border-lime-700 dark:data-[state=checked]:bg-lime-700"
          />
        </span>
        <p
          className={`text-slate-700 mr-auto sm:text-sm md:text-xl 2xl:text-2xl break-words xs:w-20 sm:w-70 md:w-100 ${
            task?.status === "done" ? "line-through" : ""
          }`}
        >
          {task.text.charAt(0).toUpperCase() + task.text.slice(1)}
        </p>
        <p className="text-gray-400 xs:text-xs sm:text-sm md:text-lg 2xl:text-xl min-w-17">
          (Priority {task.priority})
        </p>
        <Trash2
          className="stroke-amber-500 cursor-pointer transition-transform hover:scale-150 min-w-6 h-6"
          onClick={() => deleteTask(task.id)}
        />
      </Label>
    </li>
  );
};

export default TodoItem;
