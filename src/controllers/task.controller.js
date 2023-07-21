//funciones a ejccutar cuando se llame una url
import pool from "../postgresDB.js";
//recordar if si la rowscounts es 0

const getAllTasks = async (req, res, next) => {
  try {
    const allTasks = await pool.query("SELECT * FROM task");
    if (allTasks.rows.length === 0)
      return res.status(404).json({ message: "No tasks found" });
    res.json(allTasks.rows);
  } catch (error) {
    next(error);
  }
};
const getTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const task = await pool.query("SELECT * FROM task WHERE id = $1", [id]);
    if (task.rows.length === 0)
      return res.status(404).json({ message: "No task found" });
    res.json(task.rows[0]);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    const updateTask = await pool.query(
      "UPDATE task SET title = $1, description = $2 WHERE id = $3",
      [title, description, id]
    );

    if (updateTask.rowCount >= 1) {
      return res.status(200).json({ message: "Task updated successfully" }); // Use status code 200 for successful updates
    }
    return res.status(404).json({ message: "No task found" });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteTask = await pool.query("DELETE FROM task WHERE id = $1", [id]);
    if (deleteTask.rowCount === 0) {
      return res.status(404).json({ message: "No task found" });
    }
    return res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  const { title, description } = req.body;
  try {
    const newTask = await pool.query(
      "INSERT INTO task (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    if (newTask.rows.length >= 1) {
      return res
        .status(201)
        .json({ message: "Task created successfully", task: newTask.rows[0] }); // Change status code to 201 for successful creation and return the created task in the response
    }
    res.status(400).json({ message: "Failed to create task" }); // Return an error status if no task was created
  } catch (error) {
    next(error);
  }
};

export { getAllTasks, getTask, updateTask, deleteTask, createTask };
