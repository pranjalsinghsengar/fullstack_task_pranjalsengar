import React, { useState } from "react";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { useSocket } from "./hooks/useSocket";
import { useTasks } from "./hooks/useTasks";
import { Task } from "./types";

function App() {
  const [task, setTask] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editTask, setEditTask] = useState<string>("");
  const { taskList, setTaskList, fetchTasks } = useTasks();
  const socket = useSocket(setTaskList, (error) => alert(error));

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      const newTask: Task = { id: Date.now(), task, completed: false };
      socket.emit("add", newTask);
      setTask("");
    }
  };

  const startEditing = (index: number, task: string) => {
    setEditIndex(index);
    setEditTask(task);
  };

  const updateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (editIndex !== null && editTask.trim()) {
      socket.emit("update", {
        taskIndex: editIndex,
        newTask: { ...taskList[editIndex], task: editTask },
      });
      setEditIndex(null);
      setEditTask("");
    }
  };

  const toggleComplete = (index: number) => {
    const updatedTask = {
      ...taskList[index],
      completed: !taskList[index].completed,
    };
    socket.emit("update", { taskIndex: index, newTask: updatedTask });
  };

  const cancelEdit = () => setEditIndex(null);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Todo List</h1>
      <TaskForm task={task} setTask={setTask} onSubmit={addTask} />
      <TaskList
        tasks={taskList}
        editIndex={editIndex}
        editTask={editTask}
        setEditTask={setEditTask}
        toggleComplete={toggleComplete}
        startEditing={startEditing}
        updateTask={updateTask}
        cancelEdit={cancelEdit}
      />
      <div className="mt-4 text-center">
        <button
          onClick={fetchTasks}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          Refresh Tasks
        </button>
      </div>
    </div>
  );
}

export default App;