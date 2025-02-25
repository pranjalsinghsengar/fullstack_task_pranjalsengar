import { useState } from "react";
import { Task } from "../types";
import { API_URL } from "../config/config";

export const useTasks = () => {
  const [taskList, setTaskList] = useState<Task[]>([]);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${API_URL}/fetchAllTasks`);
      const data = await response.json();
      setTaskList(data.tasks || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  return { taskList, setTaskList, fetchTasks };
};