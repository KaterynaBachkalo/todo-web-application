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
      <p className="text-xl text-gray-500">Sort by Priority</p>
      <CircleChevronUp
        onClick={() => onChange("asc")}
        className={`cursor-pointer stroke-lime-700 scale-130 transition-transform hover:scale-170 hover:shadow-lg hover:shadow-amber-300 rounded-full ${
          sortStatus === "asc" ? "fill-lime-500" : "fill-none"
        }`}
      />
      <CircleChevronDown
        onClick={() => onChange("desc")}
        className={`cursor-pointer stroke-lime-700 scale-130 transition-transform hover:scale-170 hover:shadow-lg hover:shadow-amber-300 rounded-full ${
          sortStatus === "desc" ? "fill-lime-500" : "fill-none"
        }`}
      />
    </div>
  );
};

export default TodoSorterButtons;
