import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskForm from "./components/Taskform";
import TasksList from "./components/Tasklist";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <main className="container mx-auto px-20">
        <Navbar />
        <Routes>
          <Route index path="/" element={<TasksList />} />
          <Route path="/task/new" element={<TaskForm />} />
          <Route path="/task/:id/edit" element={<TaskForm />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
