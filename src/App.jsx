import React, { useState, useEffect } from "react";
import { TaskProvider } from "./context/TaskContext";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import ThemeToggle from "./components/ThemeToggle";
import "./App.css";

const App = () => {
  const [dark, setDark] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.className = dark
      ? "bg-dark text-light"
      : "bg-light text-dark";
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <TaskProvider>
      <nav
        className={`navbar navbar-expand-lg ${
          dark ? "navbar-dark bg-dark" : "navbar-light bg-light"
        } border-bottom shadow-sm`}
      >
        <div className="container">
          <span className="navbar-brand fw-bold">📝 Task Manager</span>
          <div className="ms-auto">
            <ThemeToggle dark={dark} setDark={setDark} />
          </div>
        </div>
      </nav>

      <div className="container py-4">
        <TaskForm />
        <TaskList />
      </div>
    </TaskProvider>
  );
};

export default App;
