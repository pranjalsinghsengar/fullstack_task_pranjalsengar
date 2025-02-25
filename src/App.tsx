// client/src/App.tsx
import React, { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";

interface Task {
  id: number;
  task: string;
  completed: boolean;
}

const socket: Socket = io("http://localhost:8080");

function App() {
  const [task, setTask] = useState<string>("");
  const [taskList, setTaskList] = useState<Task[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editTask, setEditTask] = useState<string>("");

  useEffect(() => {
    socket.on("taskListUpdate", (tasks: Task[]) => {
      setTaskList(tasks);
    });

    socket.on("error", (error: string) => {
      alert(error);
    });

    fetchTasks();

    return () => {
      socket.off("taskListUpdate");
      socket.off("error");
    };
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch("http://localhost:8080/fetchAllTasks");
      const data = await response.json();
      setTaskList(data.tasks || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      const newTask: Task = {
        id: Date.now(), // Temporary client-side ID
        task: task,
        completed: false,
      };
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
console.log(taskList  )
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="task-3xl font-bold task-center mb-6">Todo List</h1>

      {/* Add Task Form */}
      <form onSubmit={addTask} className="flex gap-2 mb-6">
        <input
          type="task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task"
          className="flex-1 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 task-white rounded hover:bg-blue-600 transition-colors"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <ul className="space-y-2">
        {taskList.map((task, index) => (
          <li
            key={task._id}
            className={`flex items-center gap-2 p-2 bg-gray-100 rounded ${
              task.completed ? "line-through task-gray-500" : ""
            }`}
          >
            {editIndex === index ? (
              <form onSubmit={updateTask} className="flex-1 flex gap-2">
                <input
                  type="task"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                  className="flex-1 p-1 bg-transparent border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1 bg-green-500 task-white rounded hover:bg-green-600 transition-colors"
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditIndex(null)}
                  className="px-3 py-1 bg-gray-500 task-white rounded hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleComplete(index)}
                  className="w-5 h-5"
                />
                <span className="flex-1">{task.task}</span>
                <button
                  onClick={() => startEditing(index, task.task)}
                  className="px-3 py-1 bg-yellow-500 task-white rounded hover:bg-yellow-600 transition-colors"
                >
                  Edit
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Refresh Button */}
      <div className="mt-4 task-center">
        <button
          onClick={fetchTasks}
          className="px-4 py-2 bg-purple-500 task-white rounded hover:bg-purple-600 transition-colors"
        >
          Refresh Tasks
        </button>
      </div>
    </div>
  );
}

export default App;