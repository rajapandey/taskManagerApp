import React, { useState, useRef } from "react";
import { useTasks } from "../context/TaskContext";
import Toast from "bootstrap/js/dist/toast";

const TaskForm = () => {
  const [text, setText] = useState("");
  const { addTask } = useTasks();
  const toastRef = useRef(null);

  const showToast = () => {
    if (toastRef.current) {
      const toast = new Toast(toastRef.current);
      toast.show();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      showToast();
      return;
    }
    addTask(text);
    setText("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="input-group">
          <input
            className="form-control"
            placeholder="Add a new task"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </div>
      </form>

      <div
        ref={toastRef}
        className="toast align-items-center text-bg-danger border-0 position-fixed bottom-0 end-0 m-4"
        style={{ zIndex: 1055 }}
      >
        <div className="d-flex">
          <div className="toast-body">Task cannot be empty!</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
          ></button>
        </div>
      </div>
    </>
  );
};

export default TaskForm;
