import fs from "fs";
import path from "path";
import { validationResult } from "express-validator";

const dataFile = path.resolve("data", "tasks.json");

function readTasks() {
  if (!fs.existsSync(dataFile)) return [];
  return JSON.parse(fs.readFileSync(dataFile));
}

function writeTasks(tasks) {
  fs.writeFileSync(dataFile, JSON.stringify(tasks, null, 2));
}

// ✅ READ ALL
export const getTasks = (req, res) => {
  const tasks = readTasks();
  res.status(200).json(tasks);
};

// ✅ READ BY ID
export const getTaskById = (req, res) => {
  const tasks = readTasks();
  const task = tasks.find((t) => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ error: "Task not found" });
  res.status(200).json(task);
};

// ✅ CREATE
export const createTask = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const tasks = readTasks();
  const newTask = {
    id: Date.now(),
    text: req.body.text.trim(),
    completed: false,
  };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
};

// ✅ UPDATE
export const updateTask = (req, res) => {
  const tasks = readTasks();
  const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Task not found" });

  tasks[index] = { ...tasks[index], ...req.body };
  writeTasks(tasks);
  res.status(200).json(tasks[index]);
};

// ✅ DELETE
export const deleteTask = (req, res) => {
  const tasks = readTasks();
  const filtered = tasks.filter((t) => t.id !== parseInt(req.params.id));
  if (filtered.length === tasks.length)
    return res.status(404).json({ error: "Task not found" });

  writeTasks(filtered);
  res.status(200).json({ message: "Task deleted successfully" });
};
