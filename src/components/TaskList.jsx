import React, { useState, useMemo } from "react";
import { useTasks } from "../context/TaskContext";
import TaskItem from "./TaskItem";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const TaskList = () => {
  const { tasks, reorderTasks } = useTasks();
  const [filter, setFilter] = useState("all");

  const filteredTasks = useMemo(() => {
    if (filter === "completed") return tasks.filter((t) => t.completed);
    if (filter === "pending") return tasks.filter((t) => !t.completed);
    return tasks;
  }, [tasks, filter]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const updated = Array.from(tasks);
    const [moved] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, moved);
    reorderTasks(updated);
  };

  return (
    <div>
      {/* Filter Buttons */}
      <div className="btn-group mb-3">
        <button
          className={`btn btn-${
            filter === "all" ? "primary" : "outline-primary"
          }`}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={`btn btn-${
            filter === "completed" ? "primary" : "outline-primary"
          }`}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
        <button
          className={`btn btn-${
            filter === "pending" ? "primary" : "outline-primary"
          }`}
          onClick={() => setFilter("pending")}
        >
          Pending
        </button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul
              className="list-group"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {filteredTasks.length === 0 ? (
                <div className="text-center my-5">No tasks available</div>
              ) : (
                filteredTasks.map((task, index) => {
                  return (
                    <Draggable
                      key={task.id}
                      draggableId={String(task.id)}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          className={`list-group-item d-flex justify-content-between align-items-center \
                          ${
                            task.completed
                              ? "bg-success text-white"
                              : "bg-warning"
                          } my-1 rounded-top rounded-bottom`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <div className="d-flex align-items-center w-100">
                            <span className="me-2 fw-bold">{index + 1}.</span>
                            <TaskItem task={task} />
                          </div>
                        </li>
                      )}
                    </Draggable>
                  );
                })
              )}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskList;
