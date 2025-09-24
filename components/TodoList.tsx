import Image from "next/image";
import React from "react";
import LoaderComponent from "@/components/LoaderComponent";
import TodoItem from "./TodoItem";
import { Task } from "./types";

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

interface TodoListProps {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  toggleStatusTask: (id: number) => void;
  deleteTask: (id: number) => void;
  loading: boolean;
}

const TodoList = ({
  tasks,
  setTasks,
  toggleStatusTask,
  deleteTask,
  loading,
}: TodoListProps) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    if (active.id !== over.id) {
      const oldIndex = tasks.findIndex((t) => t.id === Number(active.id));
      const newIndex = tasks.findIndex((t) => t.id === Number(over.id));

      if (oldIndex !== -1 && newIndex !== -1) {
        setTasks(arrayMove(tasks, oldIndex, newIndex));
      }
    }
  };

  return (
    <>
      {loading && <LoaderComponent />}

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={tasks.map((t) => {
            return t.id.toString();
          })}
          strategy={verticalListSortingStrategy}
        >
          <ul className="space-y-4">
            {!loading &&
              tasks?.length > 0 &&
              tasks.map((t) => (
                <TodoItem
                  key={t.id}
                  task={t}
                  toggleStatusTask={toggleStatusTask}
                  deleteTask={deleteTask}
                />
              ))}
            {!loading && tasks?.length === 0 && (
              <Image
                src="no-tasks.png"
                alt="No tasks"
                width={200}
                height={200}
                className="mx-auto mt-10 opacity-50"
              />
            )}
          </ul>
        </SortableContext>
      </DndContext>
    </>
  );
};

export default TodoList;
