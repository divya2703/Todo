const express = require("express");
const router = express.Router();

// controllers
const todoController = require("../controllers/TodoController");

router.get("/v1/todos", todoController.getTodos);
router.get("/v1/todo/:id", todoController.getTodo);
router.post("/v1/todo", todoController.postTodo);
router.put("/v1/todo/:id", todoController.putTodo);
router.delete("/v1/todo/:id", todoController.deleteTodo);



module.exports = router
