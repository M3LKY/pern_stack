// Definir URL's que usuario utilizara
import Router from "express";
import {
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
} from "../controllers/task.controller.js";
const router = Router();

//peticiones HTTP GET post  put  delete

router.get("/task", getAllTasks);

router.get("/task/:id", getTask);

router.put("/task/:id", updateTask);

router.delete("/task/:id", deleteTask);

router.post("/task", createTask);

export default router;
