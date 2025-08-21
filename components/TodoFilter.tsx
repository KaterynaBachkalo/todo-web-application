interface filterProps {
  filter: "all" | "done" | "undone";
  setFilter: (filter: "all" | "done" | "undone") => void;
}

const TodoFilter = ({ filter, setFilter }: filterProps) => {
  const filters: ("all" | "done" | "undone")[] = ["all", "done", "undone"];
  return (
    <div className="flex gap-2">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => setFilter(f)}
          className={`px-3 py-1 rounded ${
            filter === f ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
};

export default TodoFilter;
