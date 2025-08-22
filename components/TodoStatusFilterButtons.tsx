interface statusProps {
  status: "all" | "done" | "undone";
  onStatus: (status: "all" | "done" | "undone") => void;
}

const TodoStatusFilterButtons = ({ status, onStatus }: statusProps) => {
  const filters: ("all" | "done" | "undone")[] = ["all", "done", "undone"];
  return (
    <div className="flex gap-2">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onStatus(f)}
          className={`px-3 py-1 rounded cursor-pointer ${
            status === f ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default TodoStatusFilterButtons;
