import { useNavigate, Link, useLocation } from "react-router-dom";

export default function ButtonAppBar() {
  const navigate = useNavigate();
  const location = useLocation();

  // The `useLocation` hook from React Router provides access to the current URL information.
  // The `location` object contains properties such as `pathname`, `search`, and `hash`.
  // In this code, we use `location.pathname` to get the current path of the URL.
  // This information can be used for conditional rendering or to handle routing logic based on the current path.

  return (
    <nav className="flex items-center justify-between">
      <Link to="/">
        <h1 className="text-white font-bold text-4xl my-4">Tasks</h1>
      </Link>

      {location.pathname === "/task/new" ||
      location.pathname.includes("/task/") ? (
        /* Explanation of the first button condition */
        // If the current `location.pathname` is either "/task/new" or includes "/task/",
        // render the following button:
        <button
          className="bg-slate-200 text-black font-bold py-2 px-4 rounded-lg my-2"
          onClick={() => navigate("/")}
        >
          Go back
        </button>
      ) : (
        /* Explanation of the second button condition */
        // If the current `location.pathname` does not match the conditions above,
        // render the following button instead:
        <button
          className="bg-slate-200 text-black font-bold py-2 px-4 rounded-lg my-2"
          onClick={() => navigate("/task/new")}
        >
          Add Task
        </button>
      )}
    </nav>
  );
}
