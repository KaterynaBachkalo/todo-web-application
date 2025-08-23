"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Task } from "@/app/page";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { ListPlus } from "lucide-react";

interface TodoAddProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  setLoading: (loading: boolean) => void;
}

const AddForm = ({ tasks, setTasks, setLoading }: TodoAddProps) => {
  const [newTask, setNewTask] = useState("");
  const [priority, setPriority] = useState(1);

  const addTask = async () => {
    try {
      setLoading(true);
      if (newTask === "") return toast.error("Task  cannot be empty");
      const res = await fetch("http://localhost:4000/api/tasks/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newTask, priority, status: "undone" }),
      });
      const task = await res.json();

      setTasks([...tasks, task]);

      toast.success("Task added successfully");

      setNewTask("");
    } catch (error) {
      console.error("Error adding task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Input
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="New task"
        className="border p-2 flex-1 rounded w-8/9"
      />
      <Input
        type="number"
        min="1"
        max="10"
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
        className="border p-2 rounded text-lime-600 w-15"
      />
      <Button
        variant="secondary"
        onClick={addTask}
        className="px-4 py-4 rounded h-[50px] group"
      >
        <span className="transition-transform group-hover:scale-150">
          <ListPlus className="stroke-amber-500 scale-150" />
        </span>
      </Button>
    </div>
  );
};

export default AddForm;
