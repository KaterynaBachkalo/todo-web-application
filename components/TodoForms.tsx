import { Task } from "./types";
import AddForm from "./AddForm";
import SearchForm from "./SearchForm";

interface TodoFormProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  search: string;
  setSearch: (search: string) => void;
  setLoading: (loading: boolean) => void;
}

const TodoForms = ({
  tasks,
  setTasks,
  search,
  setSearch,
  setLoading,
}: TodoFormProps) => {
  return (
    <>
      <AddForm tasks={tasks} setTasks={setTasks} setLoading={setLoading} />

      <SearchForm search={search} setSearch={setSearch} />
    </>
  );
};

export default TodoForms;
