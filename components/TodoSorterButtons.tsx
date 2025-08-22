import { CircleChevronDown, CircleChevronUp } from "lucide-react";
import React from "react";

const TodoSorterButtons = ({
  sortStatus,
  onChange,
}: {
  sortStatus: "asc" | "desc" | null;
  onChange: (status: "asc" | "desc") => void;
}) => {
  return (
    <div className="flex items-center gap-4">
      Sort by Priority
      <CircleChevronUp
        onClick={() => onChange("asc")}
        className={
          sortStatus === "asc"
            ? "fill-blue-500 stroke-black cursor-pointer"
            : "cursor-pointer"
        }
      />
      <CircleChevronDown
        onClick={() => onChange("desc")}
        className={
          sortStatus === "desc"
            ? "fill-blue-500 stroke-black cursor-pointer"
            : "cursor-pointer"
        }
      />
    </div>
  );
};

export default TodoSorterButtons;
