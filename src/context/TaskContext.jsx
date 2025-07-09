import React, { createContext, useContext, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const TaskContext = createContext();
export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useLocalStorage("tasks", []);

  const addTask = useCallback(
    (text) => {
      if (!text.trim()) return;
      const newTask = { id: Date.now(), text, completed: false };
      setTasks((prev) => [...prev, newTask]);
    },
    [setTasks]
  );

  const toggleTask = useCallback(
    (id) => {
      setTasks((prev) =>
        prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
    },
    [setTasks]
  );

  const deleteTask = useCallback(
    (id) => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
    },
    [setTasks]
  );

  const reorderTasks = (items) => setTasks(items);

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, toggleTask, deleteTask, reorderTasks }}
    >
      {children}
    </TaskContext.Provider>
  );
};
