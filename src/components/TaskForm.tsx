import React from "react";

interface TaskFormProps {
  task: string;
  setTask: (task: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ task, setTask, onSubmit }) => (
  <form onSubmit={onSubmit} className="flex gap-2 mb-6">
    <input
      type="text"
      value={task}
      onChange={(e) => setTask(e.target.value)}
      placeholder="Enter a task"
      className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button
      type="submit"
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
    >
      Add Task
    </button>
  </form>
);