import { useEffect } from "react";
import io, { Socket } from "socket.io-client";
import { API_URL } from "../config/config";
import { Task } from "../types";

const socket: Socket = io(API_URL);

export const useSocket = (
  setTaskList: (tasks: Task[]) => void,
  onError: (error: string) => void
) => {
  useEffect(() => {
    socket.on("taskListUpdate", (tasks: Task[]) => setTaskList(tasks));
    socket.on("error", (error: string) => onError(error));

    return () => {
      socket.off("taskListUpdate");
      socket.off("error");
    };
  }, [setTaskList, onError]);

  return socket;
};