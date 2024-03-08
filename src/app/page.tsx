"use client";

import React, { useReducer, useState } from "react";

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const dummyTasks: Task[] = [
  { id: 1, text: "Buy groceries", completed: false },
  { id: 2, text: "Finish homework", completed: true },
  { id: 3, text: "Go to the gym", completed: false },
  { id: 4, text: "Call mom", completed: false },
  { id: 5, text: "Read a book", completed: true },
];

type Action =
  | { type: "ADD_TASK"; payload: string }
  | { type: "MARK_COMPLETE"; payload: number }
  | { type: "DELETE_TASK"; payload: number };
const taskReducer = (state: Task[], action: Action): Task[] => {
  switch (action.type) {
    case "ADD_TASK":
      return [
        ...state,
        { id: state.length + 1, text: action.payload, completed: false },
      ];
    case "MARK_COMPLETE":
      return state.map((task) =>
        task.id === action.payload ? { ...task, completed: true } : task
      );
    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
};

const HomePage: React.FC = () => {
  const [tasks, dispatch] = useReducer(taskReducer, dummyTasks);
  const [addTaskInput, setAddTaskInput] = useState<string>("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!addTaskInput.trim()) return;
    const alreadyExists = tasks.some(
      (task) => task.text.toLowerCase() === addTaskInput.toLowerCase()
    );
    if (alreadyExists) {
      alert("already existed");
      return;
    }
    dispatch({ type: "ADD_TASK", payload: addTaskInput });
    setAddTaskInput("");
  };

  const handleMarkComplete = (taskId: number) => {
    dispatch({ type: "MARK_COMPLETE", payload: taskId });
  };

  const handleDeleteTask = (taskId: number) => {
    dispatch({ type: "DELETE_TASK", payload: taskId });
  };

  const filteredTasks = tasks.filter((task) =>
    task.text.toLowerCase().includes(addTaskInput.toLowerCase())
  );

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={addTaskInput}
          onChange={(e) => setAddTaskInput(e.target.value)}
          placeholder="Enter task"
        />
        <button type="submit">Add Task</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Task</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.map((task) => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.text}</td>
              <td>
                {task.completed ? (
                  "Completed"
                ) : (
                  <button onClick={() => handleMarkComplete(task.id)}>
                    Mark Complete
                  </button>
                )}
              </td>
              <td>
                <button onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default HomePage;
