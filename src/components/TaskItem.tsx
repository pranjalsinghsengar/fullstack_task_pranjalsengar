import React from "react";
import { Task } from "../types";

interface TaskItemProps {
  task: Task;
  index: number;
  editIndex: number | null;
  editTask: string;
  setEditTask: (task: string) => void;
  toggleComplete: (index: number) => void;
  startEditing: (index: number, task: string) => void;
  updateTask: (e: React.FormEvent) => void;
  cancelEdit: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
  editIndex,
  editTask,
  setEditTask,
  toggleComplete,
  startEditing,
  updateTask,
  cancelEdit,
}) => (
  <li
    className={`flex items-center gap-2 p-2 bg-gray-100 rounded ${
      task.completed ? "line-through text-gray-500" : ""
    }`}
  >
    {editIndex === index ? (
      <form onSubmit={updateTask} className="flex-1 flex gap-2">
        <input
          type="text"
          title="text"
          value={editTask}
          onChange={(e) => setEditTask(e.target.value)}
          className="flex-1 p-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          Save
        </button>
        <button
          type="button"
          onClick={cancelEdit}
          className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
        >
          Cancel
        </button>
      </form>
    ) : (
      <>
        <input
          type="checkbox"
          title="checkbox"
          checked={task.completed}
          onChange={() => toggleComplete(index)}
          className="w-5 h-5"
        />
        <span className="flex-1">{task.task}</span>
        <button
          onClick={() => startEditing(index, task.task)}
          className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
        >
          Edit
        </button>
      </>
    )}
  </li>
);