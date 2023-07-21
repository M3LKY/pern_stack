import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const TaskForm = () => {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    /* Explanation of useEffect */
    // This effect is triggered whenever `params.id` changes (or when the component mounts if there's an initial `id`).
    // It is used to load a task from the server based on the provided `id`.
    if (params.id) {
      // If `params.id` exists, call the `loadTask` function with the `id`.
      loadTask(params.id);
    }
  }, [params.id]);

  const loadTask = async (id) => {
    /* Explanation of loadTask */
    // This asynchronous function fetches task data from the server based on the provided `id`.
    const res = await fetch("http://localhost:3000/task/" + id);
    const data = await res.json();
    // Update the state with the title and description fetched from the server.
    setTask({ title: data.title, description: data.description });
  };

  const handleDelete = async (id) => {
    /* Explanation of handleDelete */
    // This asynchronous function is responsible for deleting a task from the server.
    try {
      await fetch(`http://localhost:3000/task/${id}`, {
        method: "DELETE",
      });
      // If the request is successful, navigate the user to the home page ("/").
      navigate("/");
    } catch (error) {
      // If there's an error during the delete operation, log the error to the console.
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    /* Explanation of handleSubmit */
    // This asynchronous function is called when the user submits a form.
    e.preventDefault();
    // Set `loading` state to `true` to indicate that the submission is in progress.
    setLoading(true);
    try {
      if (params.id) {
        // If `params.id` exists, it means the form is used to update an existing task.
        const response = await fetch(
          "http://localhost:3000/task/" + params.id,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(task),
          }
        );
        await response.json();
      } else {
        // If `params.id` doesn't exist, it means the form is used to create a new task.
        const response = await fetch("http://localhost:3000/task", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task),
        });
        await response.json();
      }

      // Set `loading` state back to `false` after the request is completed.
      setLoading(false);
      // Navigate the user to the home page ("/").
      navigate("/");
    } catch (error) {
      // If there's an error during the form submission, log the error to the console.
      console.error(error);
    }
  };

  const handleChange = (e) => {
    /* Explanation of handleChange */
    // This function is used as an event handler for input fields to update the `task` state.
    // When the user types in an input field, this function is triggered,
    // and it sets the `task` state with a new object containing the existing `task` state spread out.
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit} className="w-2/5">
        <h3 className="font-bold text-2xl my-3 text-white">
          {params.id ? "Update Task" : "Create Task"}
        </h3>
        <input
          type="text"
          name="title"
          placeholder="Write your title"
          className="border border-gray-400 p-2 rounded-md block my-2 w-full"
          onChange={handleChange}
          value={task.title}
          autoFocus
        />
        <textarea
          name="description"
          rows={4}
          placeholder="Write your description"
          className="border border-gray-400 p-2 rounded-md block my-2 w-full"
          onChange={handleChange}
          value={task.description}
        ></textarea>

        <div className="flex justify-between">
          <button
            type="submit"
            disabled={!task.title || !task.description}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
          >
            {loading
              ? // <CircularProgress color="inherit" size={25} />
                loading
              : "Save"}
          </button>

          {params.id && (
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
              onClick={() => handleDelete(params.id)}
            >
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
