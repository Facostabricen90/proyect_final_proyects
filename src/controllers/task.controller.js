import { Task } from "../models/Task.js";
import { Router } from "express";
import { getProjects, getProjectTasks } from "../controllers/project.controller.js";

const router = Router();

export async function createTask(req, res) {
  try {
    const { name, done, projectId } = req.body;
    const newTask = await Task.create({
      projectId,
      name,
      done,
    });
    res.json(newTask);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getTasks(req, res) {
  try {
    const tasks = await Task.findAll({
      attributes: ["id", "projectId", "name", "done"],
      order: [["id", "DESC"]],
    });
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function updateTask(req, res) {
  const { id } = req.params;
  try {
    const task = await Task.findOne({
      attributes: ["name", "projectId", "done", "id"],
      where: { id },
    });

    task.set(req.body);

    await task.save();

    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function deleteTask(req, res) {
  const { id } = req.params;
  try {
    await Task.destroy({
      where: { id },
    });

    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export async function getTask(req, res) {
  const { id } = req.params;
  try {
    const task = await Task.findOne({
      where: { id },
      attributes: ["id", "projectId", "name", "done"],
    });
    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

router.get("/", async (req, res) => {
  const projects = await getProjects(req, res);
  res.render("projects", { projects });
});

// Ruta para obtener y renderizar las tareas de un proyecto específico
router.get("/:id/tasks", async (req, res) => {
  const { id } = req.params;
  const tasks = await getProjectTasks(req, res);
  res.render("tasks", { tasks, projectId: id });
});