import React from "react";
import { Input } from "./ui/input";

const SearchForm = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (search: string) => void;
}) => {
  return (
    <Input
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search tasks..."
      className="border p-2 w-full rounded"
    />
  );
};

export default SearchForm;
