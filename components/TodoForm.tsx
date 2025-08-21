import { Task } from "@/app/page";
import React, { useState } from "react";

interface TodoFormProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  search: string;
  setSearch: (search: string) => void;
}

const TodoForm = ({ tasks, setTasks, search, setSearch }: TodoFormProps) => {
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState(1);

  const addTask = async () => {
    const res = await fetch("http://localhost:4000/api/tasks/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: newTask, priority, status: "undone" }),
    });
    const task = await res.json();
    console.log("New task added:", task);
    console.log("Current tasks:", tasks);
    setTasks([...tasks, task]);
    setNewTask("");
  };
  return (
    <>
      <div className="flex gap-2">
        <input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New task"
          className="border p-2 flex-1 rounded"
        />
        <input
          type="number"
          min="1"
          max="10"
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          className="border p-2 w-20 rounded"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search tasks..."
        className="border p-2 w-full rounded"
      />
    </>
  );
};

export default TodoForm;
