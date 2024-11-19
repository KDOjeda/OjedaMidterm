"use client";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all"); // State to manage task filter ("all", "completed", "pending")

  // function to add the task
  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  };

  // function to mark the task as complete or incomplete
  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // function to delete the task
  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  // function to edit the task
  const editTask = (id, newText) => {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  };

  // function to clear all completed tasks
  const clearCompletedTasks = () => {
    setTasks(tasks.filter((t) => !t.completed));
  };

  // function to filter tasks based on completion status
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true; // "all" filter: show all tasks
  });

  return (
    <div className="m-5">
      <div className="title-box">
        <h1>To-Do List</h1>
      </div>
      <div className="w-full max-w-md flex">
        <input
          type="text"
          placeholder="Add a new task"
          value={task}
          className="border border-black p-2"
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask} className="ml-3 bg-gray-500 p-2">
          Add Task
        </button>
      </div>

      {/* Filter buttons */}
      <div className="mt-4">
        <button
          onClick={() => setFilter("all")}
          className={`p-2 ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`p-2 ml-2 ${filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`p-2 ml-2 ${filter === "pending" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Pending
        </button>
      </div>

      {/* Clear completed tasks */}
      <div className="mt-4">
        <button
          onClick={clearCompletedTasks}
          className="bg-red-500 text-white p-2 mt-2"
        >
          Clear Completed Tasks
        </button>
      </div>

      {/* Task list */}
      <ul className="mt-6 w-full max-w-md space-y-2">
        {filteredTasks.map((t) => (
          <li key={t.id} className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={t.completed}
                onChange={() => toggleTaskCompletion(t.id)}
              />
              <span
                className={`${
                  t.completed ? "line-through text-gray-500" : "text-gray-800"
                }`}
              >
                {t.text}
              </span>
            </div>

            {/* Edit Button */}
            <button
              onClick={() => {
                const newText = prompt("Edit task:", t.text);
                if (newText) editTask(t.id, newText);
              }}
              className="bg-yellow-500 text-white p-1 ml-2"
            >
              Edit
            </button>

            {/* Delete Button */}
            <button
              onClick={() => deleteTask(t.id)}
              className="bg-red-500 text-white p-1 ml-2"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
