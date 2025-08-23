import { Button } from "./ui/button";

interface statusProps {
  status: "all" | "done" | "undone";
  onStatus: (status: "all" | "done" | "undone") => void;
}

const TodoStatusFilterButtons = ({ status, onStatus }: statusProps) => {
  const filters: ("all" | "done" | "undone")[] = ["all", "done", "undone"];
  return (
    <div className="flex gap-2">
      {filters.map((f) => (
        <Button
          key={f}
          variant={status === f ? "secondary" : "outline"}
          onClick={() => onStatus(f)}
          className={`px-3 py-1 rounded cursor-pointer h-[50px] text-base group ${
            status === f ? "bg-blue-500" : "bg-gray-200"
          }`}
        >
          <span className="text-center transition-transform group-hover:scale-130">
            {f}
          </span>
        </Button>
      ))}
    </div>
  );
};

export default TodoStatusFilterButtons;
