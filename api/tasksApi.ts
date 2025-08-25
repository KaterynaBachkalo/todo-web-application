import { Task } from "@/components/types";
import { API_URL } from "./url";

export const fetchTasks = async (
  search: string,
  status: "all" | "done" | "undone",
  sortStatus: "asc" | "desc" | null
): Promise<Task[]> => {
  const res = await fetch(
    `${API_URL}/tasks?${search ? `search=${search}&` : ""}${
      status ? `status=${status}` : ""
    }${sortStatus ? `&sort=${sortStatus}` : ""}`
  );
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
};

export const toggleTaskStatus = async (
  id: number,
  newStatus: "undone" | "done"
): Promise<Task[]> => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      status: newStatus,
    }),
  });
  if (!res.ok) throw new Error("Failed to toggle task");
  return res.json();
};

export const deleteTaskApi = async (id: number): Promise<void> => {
  const res = await fetch(`${API_URL}/tasks/remove/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete task");
};

export const addTaskApi = async (newTask: string, priority: number) => {
  const res = await fetch(`${API_URL}/tasks/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: newTask, priority, status: "undone" }),
  });
  if (!res.ok) throw new Error("Failed to delete task");
  return res.json();
};
