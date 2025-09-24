"use client";

import { Checkbox } from "@/components/ui/checkbox";

import { Task } from "./types";
import { GripVertical, Trash2 } from "lucide-react";

import React from "react";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export interface TodoItemProps {
  task: Task;
  toggleStatusTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

const TodoItem = ({ task, toggleStatusTask, deleteTask }: TodoItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id.toString() });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li ref={setNodeRef} style={style}>
      <div className="flex hover:bg-[#f7fee780] shadow-lg hover:shadow-lime-200 shadow-lime-100  items-center gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-lime-600 has-[[aria-checked=true]]:bg-lime-100 md:p-3 2xl:p-4 w-full">
        <GripVertical
          {...listeners}
          {...attributes}
          className="cursor-grab outline-transparent"
        />
        <span className="transition-transform hover:scale-150">
          <Checkbox
            id={`toggle-${task.id}`}
            onCheckedChange={() => {
              toggleStatusTask(task.id);
            }}
            checked={task?.status === "done"}
            className="data-[state=checked]:border-lime-600 cursor-pointer data-[state=checked]:bg-lime-600 data-[state=checked]:text-white dark:data-[state=checked]:border-lime-700 dark:data-[state=checked]:bg-lime-700"
          />
        </span>
        <p
          className={`text-slate-700 mr-auto sm:text-sm md:text-xl 2xl:text-2xl break-words xs:w-20 sm:w-70 md:w-90 ${
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
          onClick={() => {
            deleteTask(task.id);
          }}
        />
      </div>
    </li>
  );
};

export default TodoItem;
