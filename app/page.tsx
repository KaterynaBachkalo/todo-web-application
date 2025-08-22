// import Image from "next/image";
"use client";
import { useCallback, useEffect, useState } from "react";

import TodoStatusFilterButtons from "@/components/TodoStatusFilterButtons";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import TodoSorterButtons from "@/components/TodoSorterButtons";
import { ToastContainer } from "react-toastify";
import LoaderComponent from "../components/LoaderComponent";

export type Task = {
  id: number;
  text: string;
  status: "all" | "done" | "undone";
  priority: number;
};

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [status, setStatus] = useState<"all" | "done" | "undone">("all");
  const [search, setSearch] = useState("");
  const [sortStatus, setSortStatus] = useState<"asc" | "desc" | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `http://localhost:4000/api/tasks?${search ? `search=${search}&` : ""}${
          status ? `status=${status}` : ""
        }${sortStatus ? `&sort=${sortStatus}` : ""}`
      );
      const data = await res.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      setLoading(false);
    }
  }, [search, status, sortStatus]);

  useEffect(() => {
    fetchTasks();
  }, [status, search, sortStatus, fetchTasks]);

  const toggleStatusTaskCheck = async (id: number) => {
    try {
      const task = tasks.find((t) => t.id === id);
      if (!task) return;

      setLoading(true);
      const res = await fetch(`http://localhost:4000/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: task.status === "done" ? "undone" : "done",
        }),
      });
      const updated = await res.json();
      setTasks(tasks.map((t) => (t.id === id ? updated : t)));

      fetchTasks();
    } catch (error) {
      console.error("Error toggling task status:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: number) => {
    try {
      setLoading(true);
      await fetch(`http://localhost:4000/api/tasks/remove/${id}`, {
        method: "DELETE",
      });
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="max-w-2xl mx-auto p-6 space-y-4">
          <h1 className="text-2xl font-bold">TODO web application</h1>

          <TodoForm
            tasks={tasks}
            setTasks={setTasks}
            search={search}
            setSearch={setSearch}
            setLoading={setLoading}
          />
          <TodoStatusFilterButtons
            status={status}
            onStatus={(newStatus) => setStatus(newStatus)}
          />
          <TodoSorterButtons
            sortStatus={sortStatus}
            onChange={(newStatus) => setSortStatus(newStatus)}
          />
          <TodoList
            tasks={tasks}
            toggleStatusTask={toggleStatusTaskCheck}
            deleteTask={deleteTask}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
