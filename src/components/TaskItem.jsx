import React from "react";
import { useTasks } from "../context/TaskContext";
import { BsTrashFill } from "react-icons/bs";

const TaskItem = React.memo(({ task }) => {
  const { toggleTask, deleteTask } = useTasks();

  return (
    <>
      <span
        onClick={() => toggleTask(task.id)}
        className={`flex-grow-1 fw-semibold fs-5 ${
          task.completed
            ? "text-decoration-line-through text-white"
            : "text-dark"
        }`}
        style={{ cursor: "pointer" }}
      >
        {task.text}
      </span>

      <div className="d-flex align-items-center">
        <span
          className={`badge me-2 ${
            task.completed ? "bg-primary text-light" : "bg-light text-danger"
          }`}
          onClick={() => toggleTask(task.id)}
        >
          {task.completed ? "Completed" : "Pending"}
        </span>
      </div>

      <button
        className="btn btn-sm btn-danger ms-2"
        title="Delete Task"
        onClick={(e) => {
          e.stopPropagation();
          deleteTask(task.id);
        }}
      >
        <BsTrashFill />
      </button>
    </>
  );
});

export default TaskItem;
