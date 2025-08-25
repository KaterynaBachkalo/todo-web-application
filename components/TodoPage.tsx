"use client";
import { Task } from "./types";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";
import TodoForms from "./TodoForms";
import TodoStatusFilterButtons from "./TodoStatusFilterButtons";
import TodoSorterButtons from "./TodoSorterButtons";
import TodoList from "./TodoList";

const API_URL: string = process.env.NEXT_PUBLIC_API_URL!;

if (!API_URL) {
  console.error("Missing NEXT_PUBLIC_API_URL");
}

const TodoPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [status, setStatus] = useState<"all" | "done" | "undone">("all");
  const [search, setSearch] = useState("");
  const [sortStatus, setSortStatus] = useState<"asc" | "desc" | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch(
        `${API_URL}/tasks?${search ? `search=${search}&` : ""}${
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
      const res = await fetch(`${API_URL}/tasks/${id}`, {
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
      await fetch(`${API_URL}/tasks/remove/${id}`, {
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
  );
};

export default TodoPage;
