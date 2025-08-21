// import Image from "next/image";
"use client";
import { useEffect, useState } from "react";

import TodoFilter from "@/components/TodoFilter";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export type Task = {
  id: number;
  text: string;
  status: "done" | "undone";
  priority: number;
};

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<"all" | "done" | "undone">("undone");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("http://localhost:4000/api/tasks")
      .then((res) => res.json())
      .then(setTasks);
  }, []);

  const toggleStatusTask = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const res = await fetch(`http://localhost:4000/api/tasks/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: task.status === "done" ? "undone" : "done",
      }),
    });
    const updated = await res.json();
    setTasks(tasks.map((t) => (t.id === id ? updated : t)));
  };

  const deleteTask = async (id: number) => {
    await fetch(`http://localhost:4000/api/tasks/remove/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((t) => t.id !== id));
  };

  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="max-w-2xl mx-auto p-6 space-y-4">
          <h1 className="text-2xl font-bold">TODO web application</h1>

          <TodoForm
            tasks={tasks}
            setTasks={setTasks}
            search={search}
            setSearch={setSearch}
          />
          <TodoFilter filter={filter} setFilter={setFilter} />
          <TodoList
            tasks={tasks}
            toggleStatusTask={toggleStatusTask}
            deleteTask={deleteTask}
          />
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
};

export default Home;
