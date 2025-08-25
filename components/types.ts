export type Task = {
  id: number;
  text: string;
  status: "all" | "done" | "undone";
  priority: number;
};
