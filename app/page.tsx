// import Image from "next/image";
"use client";
import { useCallback, useEffect, useState } from "react";

import TodoStatusFilterButtons from "@/components/TodoStatusFilterButtons";
import TodoForms from "@/components/TodoForms";
import TodoList from "@/components/TodoList";
import TodoSorterButtons from "@/components/TodoSorterButtons";
import { toast, ToastContainer } from "react-toastify";

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
      if (updated.status === "done") {
        toast.success("You did it! 🎉");
      } else {
        toast.info("Don't forget to complete your task!");
      }
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
    <div className="font-sans min-h-screen flex flex-col items-center p-2 gap-6 sm:p-4 sm:gap-8 md:p-8 md:gap-12 2xl:p-20 2xl:gap-16">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={true}
      />

      <main className="flex flex-col w-full items-center sm:items-start gap-6 md:gap-8">
        <div className="w-full max-w-full mx-auto p-2 space-y-4 sm:max-w-lg sm:p-4 md:max-w-2xl md:p-6 2xl:max-w-4xl 2xl:p-8">
          <h1 className="text-4xl font-bold text-center mb-10 text-lime-500 text-shadow-md text-shadow-amber-300 sm:text-3xl md:text-4xl lg:text-5xl">
            TODO web application
          </h1>

          <TodoForms
            tasks={tasks}
            setTasks={setTasks}
            search={search}
            setSearch={setSearch}
            setLoading={setLoading}
          />
          <div className="flex flex-col gap-2 items-center mb-6 sm:flex-row sm:gap-4 sm:justify-between sm:mb-10">
            <TodoStatusFilterButtons
              status={status}
              onStatus={(newStatus) => setStatus(newStatus)}
            />
            <TodoSorterButtons
              sortStatus={sortStatus}
              onChange={(newStatus) => setSortStatus(newStatus)}
            />
          </div>
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
