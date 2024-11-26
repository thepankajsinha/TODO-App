import express from "express";
import { createTodo, deleteTodo, getAllTodos } from "../controllers/todoController.js";
const router = express.Router();

router.post("/todos", createTodo);
router.get("/todos", getAllTodos);
router.delete("/todos/:id", deleteTodo);


export default router;