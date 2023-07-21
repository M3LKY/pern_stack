import { useState, useEffect } from "react";
import TaskCard from "./TaskCard";

const TasksList = () => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    /* Explanation of loadTasks */
    // This asynchronous function fetches tasks data from the server.
    const response = await fetch("http://localhost:3000/task");
    const data = await response.json();
    // Log the fetched data to the console.
    console.log(data);
    // Update the `tasks` state with the fetched data, which will trigger a re-render of the component.
    setTasks(data);
  };

  useEffect(() => {
    /* Explanation of useEffect */
    // This effect is triggered only once when the component mounts.
    // It calls the `loadTasks` function to fetch and load tasks from the server.
    loadTasks();
  }, []);

  return (
    <>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </>
  );
};

export default TasksList;
