import React from "react";
import { Task } from "../types";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  editIndex: number | null;
  editTask: string;
  setEditTask: (task: string) => void;
  toggleComplete: (index: number) => void;
  startEditing: (index: number, task: string) => void;
  updateTask: (e: React.FormEvent) => void;
  cancelEdit: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  editIndex,
  editTask,
  setEditTask,
  toggleComplete,
  startEditing,
  updateTask,
  cancelEdit,
}) => (
  <ul className="space-y-2">
    {tasks.map((task, index) => (
      <TaskItem
        key={task.id}
        task={task}
        index={index}
        editIndex={editIndex}
        editTask={editTask}
        setEditTask={setEditTask}
        toggleComplete={toggleComplete}
        startEditing={startEditing}
        updateTask={updateTask}
        cancelEdit={cancelEdit}
      />
    ))}
  </ul>
);